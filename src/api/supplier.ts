import type { TSupplier } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

const errMsg = (err: any) =>
  err?.response?.data?.title ||
  err?.response?.data?.message ||
  err?.title ||
  err?.message;

export async function fetchSupplier(params?: object) {
  return axiosApiInstance
    .get<TSupplier[]>(`${BASE_URL}/supplier`, {
      params,
    })
    .then(
      (res) => res.data,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function fetchDetailSupplier(id?: number) {
  return axiosApiInstance
    .get<TSupplier>(`${BASE_URL}/supplier/${id}`)
    .then(
      (res) => res.data,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}
