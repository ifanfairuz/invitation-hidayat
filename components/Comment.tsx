import { FC, useState, createRef } from "react";
import { Send } from "@icon-park/react";
import { Comment as CommentModel } from "@prisma/client";
import Loader from "./Loader";
import { useEffect } from "react";
import { useMemo } from "react";
import { formatTanggal } from "@support/string";

const Card: FC<{ data: CommentModel }> = ({ data }) => {
  const date = useMemo(() => formatTanggal(data.createdAt), [data.createdAt]);
  return (
    <div className="p-4 bg-white shadow-lg rounded flex flex-col gap-1">
      <div className="flex flex-col">
        <h3 className="f-sans font-bold">{data.name}</h3>
        <p className="f-sans text-sm opacity-70">{date}</p>
      </div>
      <p className="f-sans opacity-80 whitespace-pre-wrap">{data.text}</p>
    </div>
  );
};

const Comment: FC = () => {
  const box = createRef<HTMLDivElement>();
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [name, setname] = useState("");
  const [text, settext] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit: JSX.IntrinsicElements["form"]["onSubmit"] = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, text }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "OK") {
          setComments((c) => [res.data, ...c]);
          setname("");
          settext("");
          box.current?.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch((err) => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetch("/api/comment")
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "OK") {
          setComments(res.datas);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <form
        onSubmit={onSubmit}
        className={comments.length === 0 ? "lg:col-span-2" : ""}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-4">
            <input
              type="text"
              className="bg-main-00 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
              name="name"
              placeholder="Nama"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="w-full md:w-full px-3 mb-4">
            <textarea
              className="bg-main-00 rounded border border-gray-400 leading-normal resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Ketik ucapan anda disini"
              required
              value={text}
              onChange={(e) => settext(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full md:w-full flex items-start md:w-full px-3">
            <div>
              <button
                type="submit"
                className="px-3 py-2 rounded-md f-sans text-main-500 bg-main-00 flex items-center gap-2 text-md flex items-center gap-1"
              >
                {loading ? (
                  <>
                    <Loader className="w-6 h-6 mx-4" />
                    Loading
                  </>
                ) : (
                  <>
                    <Send />
                    Kirim
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
      {comments.length > 0 && (
        <div className="pb-8">
          <div
            ref={box}
            className="flex flex-col gap-4 h-[30rem] overflow-y-auto pr-3 pb-4 my-scrollbar scrollbar-thumb-main-50"
          >
            {comments.map((d) => (
              <Card key={d.id} data={d} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
