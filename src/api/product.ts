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
    .get<{ data: TProduct[] }>(`${BASE_URL}/products/${id}`)
    .then(
      (res) => res.data.data[0],
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
// product bundling
export async function fetchProductBundling(params?: object) {
  return axiosApiInstance
    .get<{ data: TProduct[]; meta: TPageInfo }>(
      `${BASE_URL}/products/product/bundling`,
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

export async function fetchProductBundlingDetail(params?: object) {
  return axiosApiInstance
    .get<{ data: TProduct[]; meta: TPageInfo }>(
      `${BASE_URL}/products/product/bundling-detail`,
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
// stock min for dashboard
export async function fetchProductStockMin(params?: object) {
  return axiosApiInstance
    .get<{ data: TProduct[]; meta: TPageInfo }>(
      `${BASE_URL}/products/stock-min`,
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
// upload iamge
export async function uploadImage(body: any) {
  return axiosApiInstance
    .post(`${BASE_URL}/products/product/upload`, {
      body,
    })
    .then(
      (res) => res.data,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}
