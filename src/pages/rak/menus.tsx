import { FaPen, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import type { TRak } from "../../types";
import { ModalDeleteRak, ModalUpdateRak } from "./modal";

interface TAction {
  data: TRak;
  refetch: () => void;
}

const ActionMenu = ({ data, refetch }: TAction) => {
  return (
    <div className=" flex justify-end gap-1 p-2">
      <ModalUpdateRak refetch={refetch} data={data}>
        <Button className=" border-2 border-green-500 p-2 text-green-500 hover:bg-green-500 hover:text-white">
          <FaPen />
        </Button>
      </ModalUpdateRak>
      <ModalDeleteRak refetch={refetch} data={data}>
        <Button className=" border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteRak>
    </div>
  );
};

export default ActionMenu;
