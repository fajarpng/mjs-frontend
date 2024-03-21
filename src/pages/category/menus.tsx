import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import type { TCategory } from "../../types";
import { ModalDeleteCategory, ModalUpdateCategory } from "./modal";

const ActionMenu = ({ data }: { data: TCategory }) => {
  return (
    <div className=" flex justify-end gap-1 p-2">
      <Button className=" border-2 border-blue-500 p-2 text-blue-500 hover:bg-primary-500 hover:text-white">
        <FaEye />
      </Button>
      <ModalUpdateCategory data={data}>
        <Button className=" border-2 border-green-500 p-2 text-green-500 hover:bg-green-500 hover:text-white">
          <FaPen />
        </Button>
      </ModalUpdateCategory>
      <ModalDeleteCategory data={data}>
        <Button className=" border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteCategory>
    </div>
  );
};

export default ActionMenu;
