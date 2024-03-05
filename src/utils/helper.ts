import dayjs from "dayjs";
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

export const renderDateTime = (date: string) => {
  if (!date) return "Invalid Date";
  return dayjs(date).format("Y-m-d H:i:s");
};
