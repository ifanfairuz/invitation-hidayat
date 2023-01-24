import { FC } from "react";
import { Refresh, Send } from "@icon-park/react";
import ScrollAnimation from "react-animate-on-scroll";

const Card: FC = () => {
  return (
    <div className="p-4 bg-white shadow-lg rounded flex flex-col gap-1">
      <div className="flex flex-col">
        <h3 className="f-sans font-bold">Ifan Fairuz</h3>
        <p className="f-sans text-sm opacity-70">01 Januari 2023, 11:00</p>
      </div>
      <p className="f-sans opacity-80">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum modi
        itaque maxime, sapiente accusamus libero. Enim, ipsam asperiores, a
        magnam aspernatur animi in, quas numquam voluptatum voluptas cumque
        officiis excepturi!
      </p>
    </div>
  );
};

const Comment: FC = () => {
  const datas = [1, 2, 3, 4];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <form action="">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-full px-3 mb-4">
            <input
              type="text"
              className="bg-main-00 rounded border border-gray-400 leading-normal resize-none w-full py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
              name="name"
              placeholder="Nama"
            />
          </div>
          <div className="w-full md:w-full px-3 mb-4">
            <textarea
              className="bg-main-00 rounded border border-gray-400 leading-normal resize-none w-full h-28 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Ketik ucapan anda disini"
              required
            ></textarea>
          </div>
          <div className="w-full md:w-full flex items-start md:w-full px-3">
            <div>
              <button
                type="submit"
                className="px-3 py-2 rounded-md f-sans text-main-500 bg-main-00 flex items-center gap-2 text-md flex items-center gap-1"
              >
                <Send />
                Kirim
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="pb-8">
        <div className="grid grid-cols-1 gap-4 h-[30rem] overflow-y-auto pr-3 pb-4 my-scrollbar scrollbar-thumb-main-50">
          {datas.map((d) => (
            <Card key={d} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;
