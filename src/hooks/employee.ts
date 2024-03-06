import { useQuery } from "react-query";
import fetchEmployees from "../api/user";

export const useEmployee = (query: object) => {
  return useQuery(["employee", query], () => fetchEmployees(query));
};
