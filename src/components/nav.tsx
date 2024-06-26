import {
  FaBox,
  FaBoxOpen,
  FaBoxes,
  FaClipboardList,
  FaIndustry,
  FaUserAlt,
} from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import { useAuth } from "../hooks/auth";
import type { TNav } from "../types";

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
    type: "collapse",
    icon: FaUserAlt,
    key: "employee",
    name: "Employee",
    children: [
      {
        type: "item",
        key: "/employee",
        name: "Employee List",
      },
      {
        type: "item",
        key: "/attendance",
        name: "Attendance",
      },
    ],
  },
  {
    type: "collapse",
    icon: FaBox,
    key: "product",
    name: "Product",
    children: [
      {
        type: "item",
        key: "/product",
        name: "Product List",
      },
      {
        type: "item",
        key: "/asset",
        name: "Assets",
      },
      {
        type: "item",
        key: "/rak-product",
        name: "Rak Product",
      },
    ],
  },
  {
    type: "item",
    icon: FaBoxes,
    name: "Stock Opname",
    key: "/stock-opname",
  },
  {
    type: "item",
    icon: FaBoxOpen,
    name: "Bundling",
    key: "/bundling",
  },
  {
    type: "item",
    icon: FaClipboardList,
    name: "Stock Transaction",
    key: "/stock-transaction",
  },
  {
    type: "item",
    icon: FaIndustry,
    name: "Supplier",
    key: "/supplier",
  },
];
