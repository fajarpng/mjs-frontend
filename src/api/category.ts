import type { TCategory, TPageInfo } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

export async function fetchCategory(params?: object) {
  return axiosApiInstance
    .get<{ data: TCategory[]; meta: TPageInfo }>(`${BASE_URL}/categories`, {
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

export async function addCategory(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/categories`, body)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function updateCategory({ id, ...body }: any) {
  return axiosApiInstance
    .put(`${BASE_URL}/categories/${id}`, body)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteCategory(id: number) {
  return axiosApiInstance
    .delete(`${BASE_URL}/categories/${id}`)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}
