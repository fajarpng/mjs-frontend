import type { FC, ReactElement } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError, MdRefresh, MdSearchOff } from "react-icons/md";
import Button from "./button";

interface TInfoScreen {
  status: "error" | "loading" | "success" | "idle";
  reload?: () => void;
  dataLength?: number;
  error?: unknown;
  children?: ReactElement;
}

export const InfoScreen: FC<TInfoScreen> = ({
  status,
  reload,
  dataLength,
  error,
  children,
}) => {
  // rdener jika masih loading data
  if (status === "loading") {
    return (
      <div className=" flex min-h-[300px] w-full flex-col items-center justify-center text-center dark:text-white">
        <AiOutlineLoading3Quarters
          size={100}
          className=" animate-spin text-gray-300"
        />
        <div className=" mt-6 text-xl font-bold">Please wait,</div>
        <div className=" text-lg">Loading data...</div>
      </div>
    );
  }
  // render jika ada error
  if (status === "error") {
    return (
      <div className=" flex min-h-[300px] w-full flex-col items-center justify-center text-center dark:text-white">
        <MdError size={100} className=" text-gray-300" />
        <div className=" mt-6 text-xl font-bold">Opps,</div>
        <div className=" text-lg">
          {typeof error === "string" ? error : "Something went wrong"}.
        </div>
        <Button
          onClick={reload}
          leftIcon={<MdRefresh size={25} />}
          className=" mt-4 bg-blue-500 text-white hover:bg-blue-600"
        >
          Reload
        </Button>
      </div>
    );
  }
  // render jika data kosong
  else if (!dataLength) {
    return (
      <div className=" flex min-h-[300px] w-full flex-col items-center justify-center text-center dark:text-white">
        <MdSearchOff size={100} className=" text-gray-300" />
        <div className=" mt-6 text-xl font-bold">No Data Found !</div>
        <div className=" text-lg">There is no data to show you right now.</div>
      </div>
    );
  }
  // render jika ada data
  return <div>{children}</div>;
};
