import axiosApiInstance from "./axiosApiInstance";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler } from "../utils/helper";
import type { TEmployee, TPageInfo } from "../types";

export async function fetchEmployees(params?: object) {
  return axiosApiInstance
    .get<{ data: TEmployee[]; meta: TPageInfo }>(`${BASE_URL}/employees`, {
      params,
    })
    .then(
      (res) => ({ data: res.data.data, meta: res.data.meta }),
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function addEmployee(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/employees`, body)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function updateEmployee({ id, ...body }: any) {
  return axiosApiInstance
    .put(`${BASE_URL}/employees/${id}`, body)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteEmployee(id?: number) {
  return axiosApiInstance
    .delete(`${BASE_URL}/employees/${id}`)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}
