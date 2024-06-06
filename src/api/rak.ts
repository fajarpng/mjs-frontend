import type { TRak, TPageInfo } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

export async function fetchRak(params?: object) {
  return axiosApiInstance
    .get<{ data: TRak[]; meta: TPageInfo }>(`${BASE_URL}/rak`, {
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

export async function addRak(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/rak`, body)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function updateRak({ id, ...body }: any) {
  return axiosApiInstance
    .put(`${BASE_URL}/rak/${id}`, body)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteRak(id: number) {
  return axiosApiInstance
    .delete(`${BASE_URL}/rak/${id}`)
    .then(
      () => true,
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}
