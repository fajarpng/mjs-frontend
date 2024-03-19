import { useQuery } from "react-query";
import { fetchEmployeeById, fetchEmployees } from "../api/employee";

export const useEmployee = (query: object) => {
  return useQuery(["employee", query], () => fetchEmployees(query));
};

export const useDetailEmployee = (id?: number) => {
  return useQuery(["employee/detail", id], () => fetchEmployeeById(id), {
    enabled: false,
  });
};
