import { useQuery } from "react-query";
import { fetchDetailStockOpname, fetchStockOpname } from "../api/stockOpname";

export const useStockOpname = (query: object) => {
  return useQuery(["stockOpname", query], () => fetchStockOpname(query));
};

export const useDetailStockOpname = (id?: number) => {
  return useQuery(
    ["stockOpname/detail", id],
    () => fetchDetailStockOpname(id),
    {
      enabled: false,
    }
  );
};
