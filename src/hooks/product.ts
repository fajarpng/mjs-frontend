import { useQuery } from "react-query";
import {
  fetchAssetProduct,
  fetchDetailProduct,
  fetchProduct,
  fetchProductBundling,
  fetchProductBundlingDetail,
  fetchProductStockMin,
  fetchProductTransaction,
} from "../api/product";

export const useProduct = (query?: object) => {
  return useQuery(["product", query], () => fetchProduct(query));
};

export const useAssetProduct = (query?: object) => {
  return useQuery(["product/asset", query], () => fetchAssetProduct(query));
};

export const useDetailProduct = (id?: number) => {
  return useQuery(["product/detail", id], () => fetchDetailProduct(id), {
    enabled: false,
  });
};

export const useProductStockMin = (query?: object) => {
  return useQuery(["product/stockMin", query], () =>
    fetchProductStockMin(query)
  );
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

export const useProductStockTransaction = () => {
  const query = { pageIndex: 1, pageSize: 1000 };
  return useQuery(["product/stockTransaction", query], () =>
    fetchProductTransaction(query)
  );
};
