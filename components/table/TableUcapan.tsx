import { TableOptions } from "react-table";
import { Comment } from "@prisma/client";
import Table, { CellRenderProps, TableColumns } from "./Table";
import { FC, useState } from "react";
import { memo } from "react";
import { confirmation } from "@components/Confirmation";
import { formatTanggal } from "@support/string";

interface ActionProps extends CellRenderProps<Comment> {
  afterDelete?: () => void;
  afterUpdate?: (data: Comment) => void;
}
const Action: FC<ActionProps> = memo(
  ({ row, afterDelete, afterUpdate }) => {
    const onDelete = () => {
      confirmation({
        title: "Hapus Tamu",
        message:
          "Data yang sudah dihapus tidak dapat dikembalikan, Apakah anda yakin akan hapus ucapan ?",
        onConfirm: () =>
          fetch("/api/comment", {
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

    const onShowHide = () => {
      fetch("/api/comment", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: row.original.id, show: !row.original.show }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message === "OK") {
            afterUpdate && afterUpdate(res.data);
            return;
          }
          return Promise.reject();
        })
        .catch(() => Promise.reject("Gagal."));
    };

    return (
      <div className="inline-flex">
        <button
          className="p-2 bg-gray-200 hover:bg-gray-300 text-orange-500 rounded-none rounded-l-lg"
          onClick={onShowHide}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 ${row.original.show ? "" : "text-gray-500"}`}
            viewBox="0 0 24 24"
          >
            {row.original.show ? (
              <path
                fill="currentColor"
                d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5Z"
              />
            ) : (
              <path
                fill="currentColor"
                d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z"
              />
            )}
          </svg>
        </button>
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

type TableUcapanProps<T extends object = Comment> = Omit<
  TableOptions<T>,
  "columns"
>;
const TableUcapan: FC<TableUcapanProps> = (props: TableUcapanProps<any>) => {
  const [datas, setDatas] = useState<Comment[]>(props.data as any);
  const deleteRow = (id: number) => {
    setDatas((s) => s.filter((d) => d.id !== id));
  };
  const updateRow = (id: number, data: Comment) => {
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

  const columns: TableColumns<Comment> = [
    {
      Header: "Tanggal",
      accessor: "createdAt",
      Cell: ({ value }) => formatTanggal(value, true) as any,
    },
    {
      Header: "Nama",
      accessor: "name",
    },
    {
      Header: "Ucapan",
      accessor: "text",
      Cell: ({ value }) => <div className="whitespace-pre-wrap">{value}</div>,
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
          afterUpdate={(data) => updateRow(props.row.original.id, data)}
        />
      ),
      className: "align-top",
    },
  ];

  return (
    <Table columns={columns as any} title="Ucapan" {...props} data={datas} />
  );
};

export default TableUcapan;
