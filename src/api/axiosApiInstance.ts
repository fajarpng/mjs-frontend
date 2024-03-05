import axios from "axios";
import { useAuth } from "../hooks/auth";

const auth = useAuth.getState();

const axiosApiInstance = axios.create();

interface THeadresAxiosRequest {
  Authorization?: string;
}

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const headers = config.headers as THeadresAxiosRequest;
    const token = auth.token;
    if (token) headers.Authorization = `Bearer ${token}`;
    else delete headers.Authorization;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;
