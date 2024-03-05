import axiosApiInstance from "./axiosApiInstance";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler } from "../utils/helper";
import type { TEmployee, TPageInfo } from "../types";

export default async function fetchEmployees(query?: object) {
  return axiosApiInstance
    .get<{ data: TEmployee[]; meta: TPageInfo }>(`${BASE_URL}/employees`, query)
    .then(
      (res) => ({ data: res.data.data, meta: res.data.meta }),
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}
