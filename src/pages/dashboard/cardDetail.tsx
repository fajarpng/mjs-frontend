import Barcode from "react-barcode";
import type { TProduct } from "../../types";

export const CardDetail = ({ data }: { data: TProduct }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className=" col-span-2">
        <img
          src={data.imageUrl || "/images/empty.png"}
          alt={data.productCode}
          className="w-full"
        />
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <Barcode value={data.productCode} />
      </div>

      <div className=" font-semibold">Name</div>
      <div className="col-span-3">{data.productName}</div>

      <div className=" font-semibold">Category</div>
      <div className="col-span-3">{data.categoryName}</div>

      <div className=" font-semibold">Quantity</div>
      <div className="col-span-3">{data.qty}</div>

      <div className=" font-semibold">Quantity Min</div>
      <div className="col-span-3">{data.qty}</div>

      <div className=" font-semibold">Description</div>
      <div className="col-span-3">{data.description}</div>
    </div>
  );
};
