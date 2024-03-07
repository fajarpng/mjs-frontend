import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import type { TEmployee } from "../../types";
import { ModalDeleteEmployee, ModalUpdateEmployee } from "./modal";

interface TAction {
  data: TEmployee;
  refetch: () => void;
}

const ActionMenu = ({ data, refetch }: TAction) => {
  return (
    <div className=" flex justify-end gap-1 p-2">
      <Button className=" border-2 border-blue-500 text-blue-500 hover:bg-primary-500 hover:text-white">
        <FaEye />
      </Button>
      <ModalUpdateEmployee data={data} refetch={refetch}>
        <Button className=" border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white">
          <FaPen />
        </Button>
      </ModalUpdateEmployee>
      <ModalDeleteEmployee data={data} refetch={refetch}>
        <Button className=" border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteEmployee>
    </div>
  );
};

export default ActionMenu;
