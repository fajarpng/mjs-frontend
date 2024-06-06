import { useQuery } from "react-query";
import { fetchRak } from "../api/rak";

export const useRak = (query?: object) => {
  return useQuery(["rak", query], () => fetchRak(query));
};
