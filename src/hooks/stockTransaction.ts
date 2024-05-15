import { useQuery } from "react-query";
import {
  fetchDetailStock,
  fetchStock,
  fetchStockData,
} from "../api/stockTransaction";

export const useStock = (query?: object) => {
  return useQuery(["stock", query], () => fetchStock(query));
};

export const useDetailStock = (id?: number) => {
  return useQuery(["stock/detail", id], () => fetchDetailStock(id), {
    enabled: !!id,
  });
};

export const useStockData = (stockNumber?: string) => {
  return useQuery(
    ["stock/data", stockNumber],
    () => fetchStockData(stockNumber),
    {
      enabled: !!stockNumber,
    }
  );
};
