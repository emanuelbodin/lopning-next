import classnames from "classnames";
interface PaginationProps {
  pageSize: number;
  currentPage: number;
  totalCount: number;
  changePage: (page: number) => void;
}

const Pagination = ({
  pageSize,
  currentPage,
  totalCount,
  changePage,
}: PaginationProps) => {
  const pages = Math.ceil(totalCount / pageSize);
  const pageNumbers = Array.from({ length: pages }, (_, i) => i);
  const currentStart = currentPage * pageSize + 1;
  const currentEnd =
    totalCount > pageSize ? currentStart + pageSize - 1 : totalCount;
  const stepLeft = () => {
    if (currentPage === 0) return;
    changePage(currentPage - 1);
  };
  const stepRight = () => {
    if (currentPage === pages - 1) return;
    changePage(currentPage + 1);
  };

  return (
    <nav
      className="flex justify-between items-center pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing
        <span className="font-semibold text-gray-900 dark:text-white">{`${currentStart}-${currentEnd}`}</span>
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalCount}
        </span>
      </span>
      <ul className="inline-flex items-center -space-x-px">
        <li onClick={() => stepLeft()}>
          <a className="cursor-pointer block py-2 px-3 rounded-l-lg border bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-white">
            <img className="h-5 w-5" src="arrow-left.svg" alt="arrow-left" />
          </a>
        </li>
        {pageNumbers.map((pageNumber, index) => {
          return (
            <li key={`page${index}`} onClick={() => changePage(pageNumber)}>
              <a
                className={classnames(
                  "cursor-pointer py-2 px-3 border bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white",
                  {
                    "border-gray-700": pageNumber === currentPage,
                    "bg-gray-600": pageNumber === currentPage,
                    "text-white": pageNumber === currentPage,
                  }
                )}
              >
                {pageNumber}
              </a>
            </li>
          );
        })}
        <li onClick={() => stepRight()}>
          <a className="cursor-pointer block py-2 px-3 rounded-r-lg border bg-gray-800 border-gray-700 hover:bg-gray-700 hover:text-white">
            <img className="h-5 w-5" src="arrow-right.svg" alt="arrow-right" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
