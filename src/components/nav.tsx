import { FaBox, FaUserAlt } from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import type { TNav } from "../types";
import { useAuth } from "../hooks/auth";

const { user } = useAuth.getState();

export const nav: TNav[] = [
  {
    type: "item",
    key: "/",
    icon: HiChartPie,
    name: "Dashboard",
  },
  {
    type: "collapse",
    icon: FaUserAlt,
    key: "employee",
    hidden: user?.role !== "superAdmin",
    name: "Employee",
    children: [
      {
        type: "item",
        key: "/admin",
        name: "List Admin",
      },
      {
        type: "item",
        key: "/employee",
        name: "List Employee",
      },
    ],
  },
  {
    type: "item",
    icon: FaUserAlt,
    key: "/employee",
    hidden: user?.role === "superAdmin",
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
    ],
  },
];
