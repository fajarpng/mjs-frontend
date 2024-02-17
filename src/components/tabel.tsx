import { Table } from "flowbite-react";
import type { FC, ReactElement } from "react";
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
                    <Table.HeadCell key={i}>{v}</Table.HeadCell>
                  ))}
                </Table.Head>
                {children}
              </Table>
            </div>
          </div>
        </div>
      </div>
      {pagination && <PaginationTabel />}
    </div>
  );
};

export const PaginationTabel: FC = function () {
  return (
    <div className="sticky right-0 bottom-0 w-full items-center border-t border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex sm:justify-between">
      <div className="mb-4 flex items-center sm:mb-0">
        <button className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <span className="sr-only">Previous page</span>
          <HiChevronLeft className="text-2xl" />
        </button>
        <button className="mr-2 inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <span className="sr-only">Next page</span>
          <HiChevronRight className="text-2xl" />
        </button>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            1-20
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-white">
            2290
          </span>
        </span>
      </div>
      <div className="hidden space-x-3 md:flex md:items-center ">
        <button className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          <HiChevronLeft className="mr-1 text-base" />
          Previous
        </button>
        <button className="inline-flex flex-1 items-center justify-center rounded-lg bg-primary-700 py-2 px-3 text-center text-sm font-medium text-white hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          Next
          <HiChevronRight className="ml-1 text-base" />
        </button>
      </div>
    </div>
  );
};

export default TabelComponent;
