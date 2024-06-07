import axiosApiInstance from "./axiosApiInstance";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler, errMsg } from "../utils/helper";
import type { TAttendanceConfig, TAttendance, TPageInfo } from "../types";

export async function fetchAttendance(params?: object) {
  return axiosApiInstance
    .get<{ data: TAttendance[]; meta: TPageInfo }>(`${BASE_URL}/attendances`, {
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

export async function fetchAttendanceById(id?: number) {
  return axiosApiInstance
    .get<{ data: TAttendance }>(`${BASE_URL}/attendances/${id}`)
    .then(
      (res) => res.data.data,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function fetchAttendanceByIdToday(id?: number) {
  return axiosApiInstance
    .get<{ data: TAttendance }>(`${BASE_URL}/attendances/users/${id}/today`)
    .then(
      (res) => res.data.data,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function fetchAttendanceConfiguration() {
  return axiosApiInstance
    .get<{ data: TAttendanceConfig }>(`${BASE_URL}/attendances/configurations`)
    .then(
      (res) => res.data.data,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function attendancePrepare(body?: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/attendances/prepare`, body)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function attendanceCheckin(userId: number) {
  return axiosApiInstance
    .post(`${BASE_URL}/attendances/users/${userId}/checkout`)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}

export async function attendanceCheckout(userId: number) {
  return axiosApiInstance
    .post(`${BASE_URL}/attendances/users/${userId}/checkout`)
    .then(
      () => true,
      (err) => {
        throw errMsg(err);
      }
    )
    .catch(apiErrorHandler);
}
