import { useQuery } from "react-query";
import { fetchProduct } from "../api/product";

export const useProduct = (query?: object) => {
  return useQuery(["product", query], () => fetchProduct(query));
};
