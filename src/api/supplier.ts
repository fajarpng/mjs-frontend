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

export async function updateSupplier({
  supplierCode,
  body,
}: {
  supplierCode?: string;
  body: any;
}) {
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
