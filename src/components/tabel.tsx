import { Select, Table } from "flowbite-react";
import { useMemo, type FC, type ReactElement } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useSearchQuery } from "../hooks/searchQuery";
import type { TPageInfo } from "../types";
import Button from "./button";

interface TabelProps {
  header: string[];
  children?: ReactElement;
  pagination?: TPageInfo;
  onChangePage?: () => void;
}

const TabelComponent: FC<TabelProps> = function ({
  children,
  pagination,
  header,
}) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <Table
                striped
                className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
              >
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                  {header.map((v, i) => (
                    <td
                      className={`px-2 py-3 font-bold ${
                        v === "action" && "text-center"
                      }`}
                      key={i}
                    >
                      {v}
                    </td>
                  ))}
                </Table.Head>
                {children}
              </Table>
            </div>
          </div>
        </div>
      </div>
      {pagination && <PaginationTabel meta={pagination} />}
    </div>
  );
};

export const PaginationTabel: FC<{ meta: TPageInfo }> = function ({ meta }) {
  const { setQuery } = useSearchQuery();
  const showing = useMemo(() => {
    const start = (meta.pageIndex - 1) * meta.pageSize + 1;
    let end = meta.pageIndex * meta.pageSize;
    end = end > meta.totalCount ? meta.totalCount : end;

    return { start, end };
  }, [meta]);

  const onNextPage = () => {
    setQuery({ pageIndex: meta.pageIndex + 1 });
  };
  const onPrevPage = () => {
    setQuery({ pageIndex: meta.pageIndex - 1 });
  };

  console.log(meta.pageCount, meta.pageIndex);

  return (
    <div className="flex justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
      <div className="mb-4 flex items-center sm:mb-0">
        <Button
          onClick={onPrevPage}
          disabled={meta.pageIndex < 2}
          className=" bg-transparent text-black hover:bg-gray-100 disabled:text-gray-300 dark:text-white dark:hover:bg-gray-700"
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </Button>
        <Button
          onClick={onNextPage}
          disabled={+meta.pageIndex === +meta.pageCount}
          className="mr-2 bg-transparent text-black hover:bg-gray-100 disabled:text-gray-300 dark:text-white dark:hover:bg-gray-700"
        >
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </Button>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {showing.start}
            {showing.end > 1 ? ` - ${showing.end}` : null}
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            {meta.totalCount}
          </span>
          &nbsp;Entries
        </span>
      </div>
      <span className="flex items-center gap-4">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Entries per page
        </span>
        <Select
          defaultValue={meta.pageSize}
          onChange={(e) => setQuery({ pageSize: e.target.value })}
        >
          <option>10</option>
          <option>50</option>
          <option>100</option>
          <option>500</option>
          <option>1000</option>
        </Select>
      </span>
    </div>
  );
};

export default TabelComponent;
