import type { TStock, TStockDetail } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler, errMsg } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

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
// stock transaction detail
export async function fetchStockData(stockNumber?: string) {
  return axiosApiInstance
    .get<TStockDetail[]>(`${BASE_URL}/stock-transaction-detail/${stockNumber}`)
    .then(
      (res) => res.data,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function addStockDetail({
  body,
  type,
}: {
  body: object;
  type?: string;
}) {
  return axiosApiInstance
    .post(`${BASE_URL}/stock-transaction-detail?type=${type}`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteStockDetail(id?: number) {
  return axiosApiInstance
    .delete(`${BASE_URL}/stock-transaction-detail/${id}`)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}
