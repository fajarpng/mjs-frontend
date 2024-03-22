import type { TProduct } from "../../types";

export function CardDetail({ data }: { data: TProduct }) {
  return <div>{data.productName}</div>;
}
