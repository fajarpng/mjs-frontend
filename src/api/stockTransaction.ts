import type { TPageInfo, TStock, TStockDetail } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler, errMsg } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

export async function fetchStock(params?: object) {
  return axiosApiInstance
    .get<{ data: TStock[]; meta: TPageInfo }>(`${BASE_URL}/stock-transaction`, {
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

export async function fetchDetailStock(id?: number) {
  return axiosApiInstance
    .get<{ data: TStock }>(`${BASE_URL}/stock-transaction/${id}`)
    .then(
      (res) => res.data.data,
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
export async function fetchStockData(stockNumber?: string, params?: object) {
  return axiosApiInstance
    .get<{ data: TStockDetail[]; meta: TPageInfo }>(
      `${BASE_URL}/stock-transaction-detail/${stockNumber}`,
      {
        params,
      }
    )
    .then(
      (res) => ({ data: res.data.data, meta: res.data.meta }),
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
