import type { TLeavePermit, TPageInfo } from "../types";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler, errMsg } from "../utils/helper";
import axiosApiInstance from "./axiosApiInstance";

export async function fetchLeavePermit(params?: object) {
  return axiosApiInstance
    .get<{ data: TLeavePermit[]; meta: TPageInfo }>(
      `${BASE_URL}/leave-permits`,
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

export async function fetchLeavePermitById(id?: number) {
  return axiosApiInstance
    .get<{ data: TLeavePermit }>(`${BASE_URL}/leave-permits/${id}`)
    .then(
      (res) => res.data.data,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function addLeavePermit(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/leave-permits`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function updateLeavePermit({ id, ...body }: any) {
  return axiosApiInstance
    .put(`${BASE_URL}/leave-permits/${id}`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function deleteLeavePermit(id?: number) {
  return axiosApiInstance
    .delete(`${BASE_URL}/leave-permits/${id}`)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}
