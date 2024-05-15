import { FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import type { TBundleDetail } from "../../types";
import { ModalDeleteBundling } from "./modal";

interface TAction {
  data: TBundleDetail;
  refetch: () => void;
}

export const ActionMenu = ({ data, refetch }: TAction) => {
  return (
    <div className=" flex justify-end gap-2 p-2">
      <ModalDeleteBundling data={data} refetch={refetch}>
        <Button className="border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteBundling>
    </div>
  );
};
