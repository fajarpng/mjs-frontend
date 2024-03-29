import type { TPageInfo, TProduct } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

export async function fetchProduct(params?: object) {
  return axiosApiInstance
    .get<{ data: TProduct[]; meta: TPageInfo }>(`${BASE_URL}/products`, {
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

export async function fetchDetailProduct(id?: number) {
  return axiosApiInstance
    .get<{ data: TProduct }>(`${BASE_URL}/products/${id}`)
    .then(
      (res) => res.data.data,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function addProduct(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/products`, body)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function updateProduct({ id, ...body }: any) {
  return axiosApiInstance
    .put(`${BASE_URL}/products/${id}`, body)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteProduct(id?: number) {
  return axiosApiInstance
    .delete(`${BASE_URL}/products/${id}`)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}
