import { useQuery } from "react-query";
import { fetchDetailSupplier, fetchSupplier } from "../api/supplier";

export const useSupplier = (query?: object) => {
  return useQuery(["supplier", query], () => fetchSupplier(query));
};

export const useDetailSupplier = (id?: number) => {
  return useQuery(["supplier/detail", id], () => fetchDetailSupplier(id), {
    enabled: false,
  });
};
