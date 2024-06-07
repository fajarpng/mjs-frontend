import { useQuery } from "react-query";
import {
  fetchAttendance,
  fetchAttendanceConfiguration,
} from "../api/attendance";

export const useAttendanceConfig = () => {
  return useQuery(["attendance/configuration"], fetchAttendanceConfiguration);
};

export const useAttendance = (query?: object) => {
  return useQuery(["attendance", query], () => fetchAttendance(query));
};
