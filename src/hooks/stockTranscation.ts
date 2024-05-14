import { useQuery } from "react-query";
import { fetchDetailStock, fetchStock } from "../api/stockTransaction";

export const useStock = (query?: object) => {
  return useQuery(["stock", query], () => fetchStock(query));
};

export const useDetailStock = (id?: number) => {
  return useQuery(["stock/detail", id], () => fetchDetailStock(id), {
    enabled: false,
  });
};
