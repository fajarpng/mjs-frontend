import { useQuery } from "react-query";
import { fetchCategory } from "../api/category";

export const useCategory = (query?: object) => {
  return useQuery(["category", query], () => fetchCategory(query));
};
