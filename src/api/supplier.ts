import type { TPageInfo, TSupplier } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler, errMsg } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

export async function fetchSupplier(params?: object) {
  return axiosApiInstance
    .get<{ data: TSupplier[]; meta: TPageInfo }>(`${BASE_URL}/supplier`, {
      params,
    })
    .then(
      (res) => ({ data: res.data.data, meta: res.data.meta }),
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

export async function addSupplier(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/supplier`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function updateSupplier(body: any) {
  const supplierCode = body.supplierCode || "";
  return axiosApiInstance
    .put(`${BASE_URL}/supplier/${supplierCode}?code=${supplierCode}`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteSupplier(supplierCode?: string) {
  return axiosApiInstance
    .delete(`${BASE_URL}/supplier/${supplierCode}?code=${supplierCode}`)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}
