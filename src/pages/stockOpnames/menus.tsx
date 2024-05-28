import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import type { TStockOpname } from "../../types";
import { ModalDeleteStockOpname, ModalUpdateStockOpname } from "./modal";

interface TAction {
  data: TStockOpname;
  refetch: () => void;
}

const ActionMenu = ({ data, refetch }: TAction) => {
  return (
    <div className=" flex justify-end gap-1 p-2">
      {/* <ModalDetailStockOpname data={data} refetch={refetch}> */}
      <Button className=" border-2 border-blue-500 p-2 text-blue-500 hover:bg-primary-500 hover:text-white">
        <FaEye />
      </Button>
      {/* </ModalDetailStockOpname> */}
      <ModalUpdateStockOpname data={data} refetch={refetch}>
        <Button className=" border-2 border-green-500 p-2 text-green-500 hover:bg-green-500 hover:text-white">
          <FaPen />
        </Button>
      </ModalUpdateStockOpname>
      <ModalDeleteStockOpname data={data} refetch={refetch}>
        <Button className=" border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteStockOpname>
    </div>
  );
};

export default ActionMenu;
