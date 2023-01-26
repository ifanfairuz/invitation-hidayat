import { Row, TableOptions } from "react-table";
import { Comment } from "@prisma/client";
import Table, { TableColumns } from "./Table";
import { FC } from "react";

type TableUcapanProps<T extends object = Comment> = Omit<
  TableOptions<T>,
  "columns"
>;
const TableUcapan: FC<TableUcapanProps> = (props: TableUcapanProps<any>) => {
  const columns: TableColumns<Comment> = [
    {
      Header: "Nama",
      accessor: "name",
    },
    {
      Header: "Ucapan",
      accessor: "text",
    },
    {
      Header: "#",
      accessor: "#",
      disableSortBy: true,
      disableGlobalFilter: true,
    },
  ];

  const renderAction = (row: Row<Comment>) => (
    <div className="inline-flex">
      <button className="p-2 bg-gray-200 hover:bg-gray-300 text-orange-500 rounded-none rounded-l-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3h-.17m-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7Z"
          />
        </svg>
      </button>
      <button className="p-2 bg-gray-200 hover:bg-gray-300 text-red-500 rounded-none rounded-r-lg">
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

  return (
    <Table
      columns={columns as any}
      title="Ucapan"
      renderAction={renderAction as any}
      {...props}
    />
  );
};

export default TableUcapan;
