import type { TPageInfo, TStockOpname } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

export async function fetchStockOpname(params?: object) {
  return axiosApiInstance
    .get<{ data: TStockOpname[]; meta: TPageInfo }>(
      `${BASE_URL}/stock-opnames`,
      {
        params,
      }
    )
    .then(
      (res) => ({ data: res.data.data, meta: res.data.meta }),
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function fetchDetailStockOpname(id?: number) {
  return axiosApiInstance
    .get<{ data: TStockOpname[] }>(`${BASE_URL}/stock-opnames/${id}`)
    .then(
      (res) => res.data.data[0],
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function addStockOpname(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/stock-opnames`, body)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function updateStockOpname({ id, ...body }: any) {
  return axiosApiInstance
    .put(`${BASE_URL}/stock-opnames/${id}`, body)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteStockOpname(id?: number) {
  return axiosApiInstance
    .delete(`${BASE_URL}/stock-opnames/${id}`)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}
