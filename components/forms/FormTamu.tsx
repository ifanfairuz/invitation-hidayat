import Loader from "@components/Loader";
import Panel from "@components/Panel";
import { Tamu } from "@prisma/client";
import { translatePhone } from "@support/string";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, FormHTMLAttributes, useState } from "react";

interface AddProps {
  mode: "add";
  data?: Tamu;
}
interface EditProps {
  mode: "edit";
  data: Tamu;
}
type FormTamuProps = AddProps | EditProps;
const FormTamu: FC<FormTamuProps> = ({ mode, data }) => {
  const router = useRouter();
  const [name, setname] = useState(data?.name || "");
  const [alamat, setalamat] = useState(data?.alamat || "");
  const [wa, setwa] = useState(data?.wa || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const add = () => {
    setLoading(true);
    setError("");
    fetch("/api/tamu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, alamat, wa }),
    })
      .then((res) => res.json())
      .then((res) => {
        res.message === "OK" && router.push("/dashboard/tamu");
      })
      .catch((err) => {
        setError(String(err));
      })
      .finally(() => setLoading(false));
  };
  const edit = () => {
    setLoading(true);
    setError("");
    fetch("/api/tamu", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, alamat, wa, id: data?.id || 0 }),
    })
      .then((res) => res.json())
      .then((res) => {
        res.message === "OK" && router.push("/dashboard/tamu");
      })
      .catch((err) => {
        setError(String(err));
      })
      .finally(() => setLoading(false));
  };

  const submit: FormHTMLAttributes<HTMLFormElement>["onSubmit"] = (e) => {
    e.preventDefault();
    mode === "edit" ? edit() : add();
  };

  return (
    <Panel
      title={(mode === "edit" ? "Ubah" : "Tambah") + " Tamu"}
      className="max-w-5xl"
    >
      <form onSubmit={submit}>
        <div className="px-4 pb-4">
          {!!error && (
            <p className="text-red-400 py-2 px-3 bg-red-100 rounded-lg mb-2">
              error
            </p>
          )}
          <div className="py-1">
            <span className="px-1 text-sm text-gray-600">Nama</span>
            <input
              placeholder=""
              type="text"
              className="text-md block px-3 py-2 rounded-lg w-full bg-white border border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              disabled={loading}
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="py-1">
            <span className="px-1 text-sm text-gray-600">Alamat</span>
            <input
              placeholder=""
              type="text"
              className="text-md block px-3 py-2 rounded-lg w-full bg-white border border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              disabled={loading}
              value={alamat}
              onChange={(e) => setalamat(e.target.value)}
            />
          </div>
          <div className="py-1">
            <span className="px-1 text-sm text-gray-600">No WA</span>
            <input
              placeholder=""
              type="tel"
              className="text-md block px-3 py-2 rounded-lg w-full bg-white border border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
              disabled={loading}
              value={wa}
              onChange={(e) => setwa(e.target.value)}
              onBlur={(e) => setwa(translatePhone(e.target.value))}
            />
          </div>
        </div>
        <div className="py-1 pt-2 border-t mt-2 flex items-center justify-between">
          <Link href="/dashboard/tamu">
            <button
              type="button"
              className="bg-gray-100 text-gray-700 hover:bg-gray-300 rounded-full px-6"
              disabled={loading}
            >
              Batal
            </button>
          </Link>
          <button
            type="submit"
            className="bg-main-400 text-main-00 hover:bg-main-500 rounded-full px-6 inline-flex items-center"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 -ml-2 mr-2" />
                loading
              </>
            ) : (
              "Simpan"
            )}
          </button>
        </div>
      </form>
    </Panel>
  );
};

export default FormTamu;
