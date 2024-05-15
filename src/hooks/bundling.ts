import { useQuery } from "react-query";
import { fetchBundling, fetchBundlingDetail } from "../api/bundling";

export const useBundling = (query?: object) => {
  return useQuery(["bundling", query], () => fetchBundling(query));
};

export const useDetailBundling = (code?: string) => {
  return useQuery(["bundling/detail", code], () => fetchBundlingDetail(code), {
    enabled: !!code,
  });
};
