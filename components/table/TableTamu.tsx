import { TableOptions } from "react-table";
import { Tamu } from "@prisma/client";
import Table, { CellRenderProps, TableColumns } from "./Table";
import { FC, useEffect } from "react";
import Link from "next/link";
import { memo } from "react";
import { confirmation } from "@components/Confirmation";
import { useState } from "react";
import { genLinkInvitation, genLinkWA } from "@support/string";
import {
  CheckOne,
  CloseOne,
  Delete,
  DocDetail,
  Pencil,
} from "@icon-park/react";

interface ActionProps extends CellRenderProps<Tamu> {
  afterDelete?: () => void;
}
const Action: FC<ActionProps> = memo(
  ({ row, afterDelete }) => {
    const [host, setHost] = useState("");
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

    useEffect(() => {
      setHost(`${window.location.protocol}//${window.location.host}`);
    }, []);

    return (
      <div className="inline-flex">
        <Link
          href={genLinkWA(row.original.wa, row.original.username, host)}
          target="_blank"
        >
          <button className="p-2 bg-gray-200 hover:bg-gray-300 text-green-500 rounded-none rounded-l-lg">
            <span className="text-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="m2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 0 0-.371.1a1.293 1.293 0 0 0-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 0 0 6.9 9.62c.002.49.13.967.33 1.413c.409.902 1.082 1.857 1.971 2.742c.214.213.423.427.648.626a9.448 9.448 0 0 0 3.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 0 0 .833-.231a4.83 4.83 0 0 0 .383-.22s.043-.028.125-.09c.135-.1.218-.171.33-.288c.083-.086.155-.187.21-.302c.078-.163.156-.474.188-.733c.024-.198.017-.306.014-.373c-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 0 0-.177-.041a.482.482 0 0 0-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 0 1-.368.13a1.416 1.416 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 0 1-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 0 1-1.02-1.268l-.059-.095a.923.923 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 0 0 .263-.373c.118-.19.155-.385.093-.536c-.28-.684-.57-1.365-.868-2.041c-.059-.134-.234-.23-.393-.249c-.054-.006-.108-.012-.162-.016a3.385 3.385 0 0 0-.403.004z"
                />
              </svg>
            </span>
          </button>
        </Link>
        <Link href={genLinkInvitation(row.original.username)} target="_blank">
          <button className="p-2 bg-gray-200 hover:bg-gray-300 text-purple-500 rounded-none">
            <DocDetail theme="filled" className="text-lg" />
          </button>
        </Link>
        <Link href={`/dashboard/tamu/edit?id=${row.original.id}`}>
          <button className="p-2 bg-gray-200 hover:bg-gray-300 text-blue-500 rounded-none">
            <Pencil theme="filled" className="text-lg" />
          </button>
        </Link>
        <button
          className="p-2 bg-gray-200 hover:bg-gray-300 text-red-500 rounded-none rounded-r-lg"
          onClick={onDelete}
        >
          <Delete theme="filled" className="text-lg" />
        </button>
      </div>
    );
  },
  (p, n) =>
    p.row.original.id === n.row.original.id &&
    p.row.original.wa === n.row.original.wa &&
    p.row.original.username === n.row.original.username
);
Action.displayName = "Action";

interface ActionSentProps extends CellRenderProps<Tamu> {
  afterUpdate?: (data: Tamu) => void;
}
const ActionSent: FC<ActionSentProps> = memo(
  ({ value, row, afterUpdate }) => {
    const [loading, setLoading] = useState(false);
    const onUpdate = () => {
      setLoading(true);
      fetch("/api/tamu", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: row.original.id, sent: !row.original.sent }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "OK") {
            afterUpdate && afterUpdate(res.data);
            return;
          }
          return Promise.reject();
        })
        .catch(() => Promise.reject("Gagal hapus tamu."))
        .finally(() => setLoading(false));
    };

    return (
      <div className="inline-flex items-center gap-2 justify-between w-full">
        {value ? (
          <CheckOne theme="filled" className="text-xl text-green-500" />
        ) : (
          <CloseOne theme="filled" className="text-xl text-red-500" />
        )}
        <button
          className="p-0 underline text-blue-500"
          type="button"
          onClick={onUpdate}
          disabled={loading}
        >
          {`Tandai ${value ? "belum" : "sudah"} dikirim`}
        </button>
      </div>
    );
  },
  (p, n) =>
    p.row.original.id === n.row.original.id &&
    p.row.original.sent === n.row.original.sent
);
ActionSent.displayName = "ActionSent";

type TableTamuProps<T extends object = Tamu> = Omit<TableOptions<T>, "columns">;
const TableTamu: FC<TableTamuProps> = (props: TableTamuProps<any>) => {
  const [datas, setDatas] = useState<Tamu[]>(props.data as any);
  const deleteRow = (id: number) => {
    setDatas((s) => s.filter((d) => d.id !== id));
  };
  const updateRow = (id: number, data: Tamu) => {
    setDatas((s) => {
      let n = [...s];
      for (const i in n) {
        if (n[i].id === id) {
          n[i] = data;
          continue;
        }
      }
      return n;
    });
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
      Cell: (props) => (
        <ActionSent
          {...props}
          afterUpdate={(data) => updateRow(props.row.original.id, data)}
        />
      ),
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
