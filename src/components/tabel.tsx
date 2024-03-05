import { Button, Table } from "flowbite-react";
import { useMemo, type FC, type ReactElement } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import type { TPageInfo } from "../types";

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
              <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                <Table.Head className="bg-gray-100 dark:bg-gray-700">
                  {header.map((v, i) => (
                    <td className="px-2 py-3 font-bold" key={i}>
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
  const showing = useMemo(() => {
    const start = (meta.pageIndex - 1) * meta.pageSize + 1;
    let end = meta.pageIndex * meta.pageSize;
    end = end > meta.totalCount ? meta.totalCount : end;

    return { start, end };
  }, [meta]);

  return (
    <div className="border-t border-gray-200">
      <div className="mb-4 flex items-center sm:mb-0">
        <Button
          disabled={meta.pageIndex < 2}
          className=" bg-transparent text-black hover:bg-gray-300 disabled:hover:bg-gray-300 "
        >
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </Button>
        <Button
          disabled={meta.pageIndex === meta.pageCount}
          className="mr-2 bg-transparent text-black hover:bg-gray-300 disabled:hover:bg-gray-300"
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
        </span>
      </div>
      {/* <div className="hidden space-x-3 md:flex md:items-center ">
        <Button disabled={meta.pageIndex < 2} className="text-sm">
          <HiChevronLeft className="mr-1 text-base" />
          Previous
        </Button>
        <Button
          disabled={meta.pageIndex === meta.pageCount}
          className="text-sm"
        >
          Next
          <HiChevronRight className="ml-1 text-base" />
        </Button>
      </div> */}
    </div>
  );
};

export default TabelComponent;
