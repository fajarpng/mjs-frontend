import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import type { TBundling } from "../../types";
import { ModalDeleteBundling, ModalUpdateBundling } from "./modal";

interface TAction {
  data: TBundling;
  refetch: () => void;
}

export const ActionMenu = ({ data, refetch }: TAction) => {
  return (
    <div className=" flex justify-end gap-2 p-2">
      <a href={`bundling/${data.bundlingCode}`}>
        <Button className="border-2 border-blue-500 p-2 text-blue-500 hover:bg-primary-500 hover:text-white">
          <FaEye />
        </Button>
      </a>
      <ModalUpdateBundling data={data} refetch={refetch}>
        <Button className="border-2 border-green-500 p-2 text-green-500 hover:bg-green-500 hover:text-white">
          <FaPen />
        </Button>
      </ModalUpdateBundling>
      <ModalDeleteBundling data={data} refetch={refetch}>
        <Button className="border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteBundling>
    </div>
  );
};
