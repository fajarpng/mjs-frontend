import { FaBox, FaUserAlt } from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import type { TNav } from "../types";
import { useAuth } from "../hooks/auth";

// eslint-disable-next-line no-empty-pattern
const {} = useAuth.getState();

export const nav: TNav[] = [
  {
    type: "item",
    key: "/",
    icon: HiChartPie,
    name: "Dashboard",
  },
  {
    type: "item",
    icon: FaUserAlt,
    key: "/employee",
    name: "Employee",
  },
  {
    type: "collapse",
    icon: FaBox,
    key: "product",
    name: "Product",
    children: [
      {
        type: "item",
        key: "/master-product",
        name: "Master Product",
      },
      {
        type: "item",
        key: "/category-product",
        name: "Category Product",
      },
    ],
  },
];
