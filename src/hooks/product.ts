import { useQuery } from "react-query";
import {
  fetchDetailProduct,
  fetchProduct,
  fetchProductBundling,
  fetchProductBundlingDetail,
} from "../api/product";

export const useProduct = (query?: object) => {
  return useQuery(["product", query], () => fetchProduct(query));
};

export const useDetailProduct = (id?: number) => {
  return useQuery(["product/detail", id], () => fetchDetailProduct(id), {
    enabled: false,
  });
};

export const useProductBundling = () => {
  const query = { pageIndex: 1, pageSize: 1000 };
  return useQuery(["product/bundling", query], () =>
    fetchProductBundling(query)
  );
};

export const useProductBundlingDetail = () => {
  const query = { pageIndex: 1, pageSize: 1000 };
  return useQuery(["product/bundlingDetail", query], () =>
    fetchProductBundlingDetail(query)
  );
};
