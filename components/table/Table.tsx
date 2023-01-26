import Panel from "@components/Panel";
import { InputHTMLAttributes, FC, memo } from "react";
import {
  TableInstance,
  TableOptions,
  usePagination,
  useSortBy,
  useTable,
  UsePaginationInstanceProps,
  UseSortByInstanceProps,
  Row,
  useGlobalFilter,
  UseGlobalFiltersInstanceProps,
  Column,
  UseGlobalFiltersColumnOptions,
  UseSortByColumnOptions,
} from "react-table";
import PaginationTable from "./PaginationTable";

interface GlobalFilterInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}
const GlobalFilterInput: FC<GlobalFilterInputProps> = memo(
  ({ ...props }) => {
    return (
      <input
        {...props}
        className={
          "w-full px-3 py-2 text-base font-normal ring-0 border-0 outline-none rounded-lg " +
          (props.className || "")
        }
        placeholder={`Pencarian...`}
        type="search"
      />
    );
  },
  (prev, next) => prev.value === next.value
);
GlobalFilterInput.displayName = "GlobalFilterInput";

type TableProps = TableOptions<{}> & {
  title?: string;
  aside?: JSX.Element;
  renderAction?: (row: Row) => JSX.Element;
};
const Table: FC<TableProps> = ({
  title,
  aside,
  columns,
  data,
  renderAction,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    visibleColumns,

    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  ) as TableInstance &
    UseGlobalFiltersInstanceProps<{}> &
    UseSortByInstanceProps<{}> &
    UsePaginationInstanceProps<{}> & {
      state: { pageIndex: number; pageSize: number; globalFilter: string };
    };

  return (
    <Panel title={title} aside={aside}>
      <div className="overflow-x-auto">
        <table {...getTableProps()} className="table-auto w-full">
          <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-100">
            <tr>
              <th
                colSpan={visibleColumns.length}
                className="px-4 pb-2 pt-4 whitespace-nowrap"
              >
                <GlobalFilterInput
                  value={state.globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
              </th>
            </tr>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="p-4 whitespace-nowrap"
                  >
                    <div className="font-semibold text-left flex items-center justify-between">
                      <span>{column.render("Header")}</span>
                      <span>
                        {column.canSort && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className={
                              "w-4 h-4 " +
                              (column.isSorted ? "text-gray-600" : "")
                            }
                            fill="currentColor"
                          >
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <path d="m8 8l8-8l8 8z" />
                              ) : (
                                <path d="m24 24l-8 8l-8-8z" />
                              )
                            ) : (
                              <path
                                fill="currentColor"
                                d="m24 24l-8 8l-8-8zM8 8l8-8l8 8z"
                              />
                            )}
                          </svg>
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            {...getTableBodyProps()}
            className="text-sm divide-y divide-gray-100"
          >
            {page.length === 0 ? (
              <tr>
                <td className="p-4" colSpan={visibleColumns.length}>
                  <div className="text-gray-500 text-center">
                    Tidak ada data.
                  </div>
                </td>
              </tr>
            ) : (
              page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()} className="p-4 ">
                          {cell.column.id === "#" && !!renderAction ? (
                            renderAction(row)
                          ) : (
                            <div className="text-gray-800">
                              {cell.render("Cell")}
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <PaginationTable
        pageCount={pageCount}
        pageSize={state.pageSize}
        pageIndex={state.pageIndex}
        setPageSize={setPageSize}
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
      />
    </Panel>
  );
};

type WithActionData<T> = T & { ["#"]: any };
export type TableColumns<T extends object> = (Column<WithActionData<T>> &
  UseGlobalFiltersColumnOptions<WithActionData<T>> &
  UseSortByColumnOptions<WithActionData<T>>)[];

export default Table;
