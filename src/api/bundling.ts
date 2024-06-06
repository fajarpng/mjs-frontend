import type { TBundling, TBundlingDetail, TPageInfo } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler, errMsg } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

export async function fetchBundling(params?: object) {
  return axiosApiInstance
    .get<{ data: TBundling[]; meta: TPageInfo }>(`${BASE_URL}/bundling`, {
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

export async function addBundling(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/bundling`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function updateBundling({ id, ...body }: any) {
  return axiosApiInstance
    .put(`${BASE_URL}/bundling/${id}`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteBundling(id?: number) {
  return axiosApiInstance
    .delete(`${BASE_URL}/bundling/${id}`)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}
// bundling detail
export async function fetchBundlingDetail(code?: string) {
  return axiosApiInstance
    .get<TBundlingDetail>(`${BASE_URL}/bundling/${code}`)
    .then(
      (res) => res.data,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function addBundlinDetail(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/bundling-detail`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteBundlingDetail(id?: number) {
  return axiosApiInstance
    .delete(`${BASE_URL}/bundling-detail/${id}`)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}
