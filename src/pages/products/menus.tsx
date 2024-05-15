import Barcode from "react-barcode";
import { FaEye, FaPen, FaPrint, FaTrash } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import Button from "../../components/button";
import type { TProduct } from "../../types";
import {
  ModalDeleteProduct,
  ModalDetailProduct,
  ModalUpdateProduct,
} from "./modal";
import { useRef } from "react";

interface TAction {
  data: TProduct;
  refetch: () => void;
}

export const ActionMenu = ({ data, refetch }: TAction) => {
  const barcodeRef = useRef<Barcode>(null);
  const handlePrint = useReactToPrint({
    content: () => barcodeRef.current,
    pageStyle: `
    @page { size: 30mm 20mm };
    @media all {
      .pageBreak { display: none }
    };
    @media print {
      .pageBreak { page-break-before: always }
    }
    `,
  });

  return (
    <div className=" flex justify-end gap-2 p-2">
      {/* print barcode */}
      <div className=" hidden">
        <Barcode
          width={1}
          height={30}
          value={data.productCode}
          ref={barcodeRef}
        />
      </div>

      <Button
        onClick={handlePrint}
        className="border-2 border-yellow-500 p-2 text-yellow-500 hover:bg-yellow-500 hover:text-white"
      >
        <FaPrint />
      </Button>

      {/* detail prduct */}
      <ModalDetailProduct data={data} refetch={refetch}>
        <Button className="border-2 border-blue-500 p-2 text-blue-500 hover:bg-primary-500 hover:text-white">
          <FaEye />
        </Button>
      </ModalDetailProduct>

      {/* update product */}
      <ModalUpdateProduct data={data} refetch={refetch}>
        <Button className="border-2 border-green-500 p-2 text-green-500 hover:bg-green-500 hover:text-white">
          <FaPen />
        </Button>
      </ModalUpdateProduct>

      {/* delete product */}
      <ModalDeleteProduct data={data} refetch={refetch}>
        <Button className="border-2 border-red-500 p-2 text-red-500 hover:bg-red-500 hover:text-white">
          <FaTrash />
        </Button>
      </ModalDeleteProduct>
    </div>
  );
};
