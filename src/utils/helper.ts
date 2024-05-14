import dayjs from "dayjs";
import qs from "qs";
import Swal from "sweetalert2";

export const apiErrorHandler = (message?: string) => {
  const errMsg = typeof message === "string" ? message : "something went wrong";

  Swal.fire({
    title: "Opps!!",
    text: errMsg,
    icon: "error",
  });

  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw errMsg;
};

export const formatNmber = (price: string) => {
  if (!price) return 0;
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const renderDateTime = (date: string | Date) => {
  if (!date) return "Invalid Date";
  return dayjs(date).format("DD-MM-YYYY HH:mm");
};

export const renderDate = (date: string) => {
  if (!date) return "Invalid Date";
  return dayjs(date).format("dddd, DD-MM-YYYY");
};

export function getQuery() {
  const locationSearch = window.location.search;
  const query = qs.parse(locationSearch, { ignoreQueryPrefix: true });
  return query;
}
