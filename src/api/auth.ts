import axiosApiInstance from "./axiosApiInstance";
import { BASE_URL } from "../utils/config";
import { apiErrorHandler } from "../utils/helper";
import type { TEmployee } from "../types";

export default async function submitLogin(body: object) {
  return axiosApiInstance
    .post(`${BASE_URL}/auth/login`, body)
    .then(
      (res) => res.data?.data as { token: string; employee: TEmployee },
      (err) => {
        throw err?.response?.data?.message || err?.message;
      }
    )
    .catch(apiErrorHandler);
}
