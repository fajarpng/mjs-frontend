import { useQuery } from "react-query";
import { fetchDetailProduct, fetchProduct } from "../api/product";

export const useProduct = (query?: object) => {
  return useQuery(["product", query], () => fetchProduct(query));
};

export const useDetailProduct = (id?: number) => {
  return useQuery(["product/detail", id], () => fetchDetailProduct(id), {
    enabled: false,
  });
};
