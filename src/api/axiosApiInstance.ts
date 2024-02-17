import axios from "axios";
import { useAuth } from "../hooks/auth";

const axiosApiInstance = axios.create();

interface THeadresAxiosRequest {
  token?: string;
}

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const headers = config.headers as THeadresAxiosRequest;
    const token = useAuth((state) => state.user?.token);
    if (token) headers.token = token;
    else delete headers.token;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;
