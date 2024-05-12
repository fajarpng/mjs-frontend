import {
  FaBox,
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
        key: "/product",
        name: "Product List",
      },
      {
        type: "item",
        key: "/category-product",
        name: "Category Product",
      },
    ],
  },
  {
    type: "item",
    icon: FaBoxes,
    name: "Stock Opnames",
    key: "/stock-opname",
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
