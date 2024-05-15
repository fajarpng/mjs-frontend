import { FaEye, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import type { TStock } from "../../types";
import { ModalDeleteStock } from "./modal";

interface TAction {
  data: TStock;
  refetch: () => void;
}

export const ActionMenu = ({ data, refetch }: TAction) => {
  return (
    <div className=" flex justify-end gap-2 p-2">
      <a href={`stock-transaction/${data.id}`}>
        <Button className="border-2 border-blue-500 p-2 text-blue-500 hover:bg-primary-500 hover:text-white">
          <FaEye />
        </Button>
      </a>
      {/* <ModalUpdateStock data={data} refetch={refetch}>
        <Button className="border-2 border-green-500 p-2 text-green-500 hover:bg-green-500 hover:text-white">
          <FaPen />
        </Button>
      </ModalUpdateStock> */}
      <ModalDeleteStock data={data} refetch={refetch}>
        <Button className="border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteStock>
    </div>
  );
};
