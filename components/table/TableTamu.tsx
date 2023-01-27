import { TableOptions } from "react-table";
import { Tamu } from "@prisma/client";
import Table, { CellRenderProps, TableColumns } from "./Table";
import { FC } from "react";
import Link from "next/link";
import { memo } from "react";
import { confirmation } from "@components/Confirmation";
import { useState } from "react";
import { templateWA } from "@support/string";

interface ActionProps extends CellRenderProps<Tamu> {
  afterDelete?: () => void;
}
const Action: FC<ActionProps> = memo(
  ({ row, afterDelete }) => {
    const onDelete = () => {
      confirmation({
        title: "Hapus Tamu",
        message:
          "Data yang sudah dihapus tidak dapat dikembalikan, Apakah anda yakin akan hapus tamu ?",
        onConfirm: () =>
          fetch("/api/tamu", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: row.original.id }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.message === "OK") {
                afterDelete && afterDelete();
                return;
              }
              return Promise.reject();
            })
            .catch(() => Promise.reject("Gagal hapus tamu.")),
      });
    };

    const text = templateWA(
      `https://nduoseh.com/hidayatjendelalangit?name=${row.original.username}`
    );
    const walink =
      "https://wa.me/" + row.original.wa + "?text=" + encodeURI(text);

    return (
      <div className="inline-flex">
        <Link href={walink} target="_blank">
          <button className="p-2 bg-gray-200 hover:bg-gray-300 text-green-500 rounded-none rounded-l-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 0 0-.371.1a1.293 1.293 0 0 0-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 0 0 6.9 9.62c.002.49.13.967.33 1.413c.409.902 1.082 1.857 1.971 2.742c.214.213.423.427.648.626a9.448 9.448 0 0 0 3.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 0 0 .833-.231a4.83 4.83 0 0 0 .383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288c.083-.086.155-.187.21-.302c.078-.163.156-.474.188-.733c.024-.198.017-.306.014-.373c-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 0 0-.177-.041a.482.482 0 0 0-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 0 1-.368.13a1.416 1.416 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 0 1-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 0 1-1.02-1.268l-.059-.095a.923.923 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 0 0 .263-.373c.118-.19.155-.385.093-.536c-.28-.684-.57-1.365-.868-2.041c-.059-.134-.234-.23-.393-.249c-.054-.006-.108-.012-.162-.016a3.385 3.385 0 0 0-.403.004z"
              />
            </svg>
          </button>
        </Link>
        <Link href={`/dashboard/tamu/edit?id=${row.original.id}`}>
          <button className="p-2 bg-gray-200 hover:bg-gray-300 text-blue-500 rounded-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75L3 17.25Z"
              />
            </svg>
          </button>
        </Link>
        <button
          className="p-2 bg-gray-200 hover:bg-gray-300 text-red-500 rounded-none rounded-r-lg"
          onClick={onDelete}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m0 5h2v9H9V8m4 0h2v9h-2V8Z"
            />
          </svg>
        </button>
      </div>
    );
  },
  (p, n) => p.row.original.id === n.row.original.id
);
Action.displayName = "Action";

type TableTamuProps<T extends object = Tamu> = Omit<TableOptions<T>, "columns">;
const TableTamu: FC<TableTamuProps> = (props: TableTamuProps<any>) => {
  const [datas, setDatas] = useState<Tamu[]>(props.data as any);
  const deleteRow = (id: number) => {
    setDatas((s) => s.filter((d) => d.id !== id));
  };

  const columns: TableColumns<Tamu> = [
    {
      Header: "Nama",
      accessor: "name",
    },
    {
      Header: "Alamat",
      accessor: "alamat",
    },
    {
      Header: "No WA",
      accessor: "wa",
    },
    {
      Header: "Dikirim",
      accessor: "sent",
      Cell: ({ value }) => String(value ? "Dikirim" : "Belum") as any,
    },
    {
      Header: "#",
      accessor: "#",
      disableSortBy: true,
      disableGlobalFilter: true,
      Cell: (props) => (
        <Action
          {...props}
          afterDelete={() => deleteRow(props.row.original.id)}
        />
      ),
      className: "align-top",
    },
  ];

  return (
    <Table
      columns={columns as any}
      title="Daftar Tamu Undangan"
      aside={
        <Link
          href="/dashboard/tamu/add"
          className="inline-flex items-center gap-1 text-md bg-main-400 hover:bg-white/20 px-3 py-1.5 -my-0.5 text-white font-medium rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5"
          >
            <path
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
              d="M11 19v-6H5v-2h6V5h2v6h6v2h-6v6Z"
            />
          </svg>
          <span> Tambah</span>
        </Link>
      }
      {...props}
      data={datas}
    />
  );
};

export default TableTamu;
