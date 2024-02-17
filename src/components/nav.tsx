import { FaBox } from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import type { TNav } from "../types";

export const nav: TNav[] = [
  {
    type: "item",
    key: "/",
    icon: HiChartPie,
    name: "Home",
  },
  {
    type: "collapse",
    icon: FaBox,
    key: "products",
    name: "Products",
    children: [
      {
        type: "item",
        key: "/master-barang",
        name: "Master Barang",
      },
    ],
  },
];
