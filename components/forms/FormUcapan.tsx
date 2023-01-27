import Panel from "@components/Panel";
import { Comment } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

interface AddProps {
  mode: "add";
  data?: Comment;
}
interface EditProps {
  mode: "edit";
  data: Comment;
}
type FormUcapanProps = AddProps | EditProps;
const FormUcapan: FC<FormUcapanProps> = ({ mode, data }) => {
  return (
    <Panel title={(mode === "edit" ? "Ubah" : "Tambah") + " Ucapan"}>
      <form action="">
        <div className="px-4 pb-4">
          <div className="py-1">
            <span className="px-1 text-sm text-gray-600">Nama</span>
            <input
              placeholder=""
              type="text"
              className="text-md block px-3 py-2 rounded-lg w-full bg-white border border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            />
          </div>
          <div className="py-1">
            <span className="px-1 text-sm text-gray-600">Alamat</span>
            <input
              placeholder=""
              type="text"
              className="text-md block px-3 py-2 rounded-lg w-full bg-white border border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            />
          </div>
          <div className="py-1">
            <span className="px-1 text-sm text-gray-600">No WA</span>
            <input
              placeholder=""
              type="tel"
              className="text-md block px-3 py-2 rounded-lg w-full bg-white border border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
            />
          </div>
        </div>
        <div className="py-1 pt-2 border-t mt-2 flex items-center justify-between">
          <Link href="/dashboard/tamu">
            <button
              type="button"
              className="bg-gray-100 text-gray-700 hover:bg-gray-300 rounded-full px-6"
            >
              Batal
            </button>
          </Link>
          <button
            type="submit"
            className="bg-main-400 text-main-00 hover:bg-main-500 rounded-full px-6"
          >
            Simpan
          </button>
        </div>
      </form>
    </Panel>
  );
};

export default FormUcapan;
