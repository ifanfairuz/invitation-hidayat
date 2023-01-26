import { ButtonHTMLAttributes, FC, memo, useMemo } from "react";

interface PaginationItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isactive?: boolean;
}
const PaginationItem: FC<PaginationItemProps> = memo(
  ({ isactive, ...props }) => {
    return (
      <li>
        <button
          {...props}
          type="button"
          className={
            "text-sm bg-white border border-gray-300 hover:bg-main-400 hover:text-main-00 ml-0 rounded-none leading-tight py-2 px-3 " +
            (!isactive ? "" : "bg-main-400 text-main-50 ") +
            (props.className || "")
          }
        >
          {props.children}
        </button>
      </li>
    );
  },
  (prev, next) =>
    prev.value === next.value &&
    prev.isactive === next.isactive &&
    prev.disabled === next.disabled
);
PaginationItem.displayName = "PaginationItem";

interface PaginationProps extends DivProps {
  pageCount: number;
  pageSize: number;
  pageIndex: number;
  setPageSize: (value: number) => void;
  gotoPage: (index: number) => void;
  previousPage: () => void;
  nextPage: () => void;
}
const PaginationTable: FC<PaginationProps> = memo(
  ({
    pageCount: pc,
    pageSize,
    pageIndex,
    setPageSize,
    gotoPage,
    previousPage,
    nextPage,
    ...props
  }) => {
    const range = (start: number, end: number) => {
      let length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };

    const pageCount = useMemo(() => pc || 1, [pc]);
    const canNextPage = useMemo(
      () => pageIndex < pageCount,
      [pageIndex, pageCount]
    );
    const canPreviousPage = useMemo(() => pageIndex > 0, [pageIndex]);

    const pagination = useMemo(() => {
      const siblingCount = 1;
      const totalPageNumbers = siblingCount + 5;
      if (totalPageNumbers >= pageCount) {
        return range(1, pageCount);
      }

      const currentPage = pageIndex + 1;
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, pageCount);
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < pageCount - 2;
      if (!shouldShowLeftDots && shouldShowRightDots) {
        const leftItemCount = 3 + 2 * siblingCount;
        const leftRange = range(1, leftItemCount);

        return [...leftRange, "...", pageCount];
      }

      const firstPageIndex = 1;
      const lastPageIndex = pageCount;
      if (shouldShowLeftDots && !shouldShowRightDots) {
        let rightItemCount = 3 + 2 * siblingCount;
        let rightRange = range(pageCount - rightItemCount + 1, pageCount);
        return [firstPageIndex, "...", ...rightRange];
      }

      if (shouldShowLeftDots && shouldShowRightDots) {
        let middleRange = range(leftSiblingIndex, rightSiblingIndex);
        return [firstPageIndex, "...", ...middleRange, "...", lastPageIndex];
      }

      return [1];
    }, [pageCount, pageSize, pageIndex]);

    return (
      <div
        {...props}
        className={
          "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 mt-4 " +
          (props.className || "")
        }
      >
        <div className="inline-flex">
          <span>
            {"Halaman "}
            <strong>
              {pageIndex + 1} / {pageCount}
            </strong>
          </span>
          <span className="mx-2">|</span>
          <span>Tampilkan</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize} Baris
              </option>
            ))}
          </select>
        </div>
        <nav>
          <ul className="inline-flex -space-x-px">
            <PaginationItem
              onClick={previousPage}
              disabled={!canPreviousPage}
              className="rounded-l-lg"
              value={pageIndex - 1}
            >
              {"<"}
            </PaginationItem>
            {pagination?.map((p, i) => (
              <PaginationItem
                key={`${p}-${i}`}
                onClick={() => typeof p === "number" && gotoPage(p - 1)}
                disabled={p === "..."}
                isactive={pageIndex + 1 === p}
                value={p}
              >
                {p}
              </PaginationItem>
            ))}
            <PaginationItem
              onClick={nextPage}
              disabled={!canNextPage}
              className="rounded-r-lg"
              value={pageIndex + 1}
            >
              {">"}
            </PaginationItem>
          </ul>
        </nav>
      </div>
    );
  },
  (prev, next) =>
    prev.pageCount === next.pageCount &&
    prev.pageIndex === next.pageIndex &&
    prev.pageSize === next.pageSize
);
PaginationTable.displayName = "PaginationTable";

export default PaginationTable;
