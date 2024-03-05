import { Button } from "flowbite-react";
import type { FC, ReactElement } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError, MdSearchOff } from "react-icons/md";

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
      <div className=" flex min-h-[300px] w-full flex-col items-center justify-center text-center">
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
      <div className=" flex min-h-[300px] w-full flex-col items-center justify-center text-center">
        <MdError size={100} className=" text-gray-300" />
        <div className=" mt-6 text-xl font-bold">Opps,</div>
        <div className=" text-lg">
          {typeof error === "string" ? error : "Something went wrong"}.
        </div>
        <Button onClick={reload} className=" mt-4">
          Reload
        </Button>
      </div>
    );
  }
  // render jika data kosong
  else if (!dataLength) {
    return (
      <div className=" flex min-h-[300px] w-full flex-col items-center justify-center text-center">
        <MdSearchOff size={100} className=" text-gray-300" />
        <div className=" mt-6 text-xl font-bold">No Data Found !</div>
        <div className=" text-lg">There is no data to show you right now.</div>
      </div>
    );
  }
  // render jika ada data
  return <div>{children}</div>;
};
