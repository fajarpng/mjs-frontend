import type { TStock } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

const errMsg = (err: any) =>
  err?.response?.data?.title ||
  err?.response?.data?.message ||
  err?.title ||
  err?.message;

export async function fetchStock(params?: object) {
  return axiosApiInstance
    .get<TStock[]>(`${BASE_URL}/stock-transaction`, {
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

export async function fetchDetailStock(id?: number) {
  return axiosApiInstance
    .get<TStock>(`${BASE_URL}/stock-transaction/${id}`)
    .then(
      (res) => res.data,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function addStock(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/stock-transaction`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function updateStock({ id, ...body }: any) {
  return axiosApiInstance
    .put(`${BASE_URL}/stock-transaction/${id}`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteStock(id?: number) {
  return axiosApiInstance
    .delete(`${BASE_URL}/stock-transaction/${id}`)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}
