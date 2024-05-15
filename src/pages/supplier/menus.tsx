import { FaPen, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import type { TSupplier } from "../../types";
import { ModalDeleteSupplier, ModalUpdateSupplier } from "./modal";

interface TAction {
  data: TSupplier;
  refetch: () => void;
}

export const ActionMenu = ({ data, refetch }: TAction) => {
  return (
    <div className=" flex justify-end gap-2 p-2">
      <ModalUpdateSupplier data={data} refetch={refetch}>
        <Button className="border-2 border-green-500 p-2 text-green-500 hover:bg-green-500 hover:text-white">
          <FaPen />
        </Button>
      </ModalUpdateSupplier>
      <ModalDeleteSupplier data={data} refetch={refetch}>
        <Button className="border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteSupplier>
    </div>
  );
};
