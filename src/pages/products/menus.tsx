import { FaEye, FaPen, FaTrash } from "react-icons/fa";
import Button from "../../components/button";
import type { TProduct } from "../../types";
import {
  ModalDeleteProduct,
  ModalDetailProduct,
  ModalUpdateProduct,
} from "./modal";

interface TAction {
  data: TProduct;
  refetch: () => void;
}

export const ActionMenu = ({ data, refetch }: TAction) => {
  return (
    <div className=" flex justify-end gap-2 p-2">
      <ModalDetailProduct data={data} refetch={refetch}>
        <Button className="border-2 border-blue-500 p-2 text-blue-500 hover:bg-primary-500 hover:text-white">
          <FaEye />
        </Button>
      </ModalDetailProduct>
      <ModalUpdateProduct data={data} refetch={refetch}>
        <Button className="border-2 border-green-500 p-2 text-green-500 hover:bg-green-500 hover:text-white">
          <FaPen />
        </Button>
      </ModalUpdateProduct>
      <ModalDeleteProduct data={data} refetch={refetch}>
        <Button className="border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteProduct>
    </div>
  );
};
