import { FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import type { TStockDetail } from "../../types";
import { ModalDeleteStock } from "./modal";

interface TAction {
  data: TStockDetail;
  refetch: () => void;
}

export const ActionMenu = ({ data, refetch }: TAction) => {
  return (
    <div className=" flex justify-end gap-2 p-2">
      <ModalDeleteStock data={data} refetch={refetch}>
        <Button className="border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteStock>
    </div>
  );
};
