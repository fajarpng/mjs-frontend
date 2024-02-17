import type { FC, SVGProps } from "react";

export interface TNav {
  type: "item" | "collapse";
  name: string;
  key: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  children?: TNav[];
}
export interface TProduct {
  id: number;
  productCode: string;
  productName: string;
  barcode: string;
  description: string;
  qty: number;
  qtyMin: number;
  type: 1 | 2;
  createdAt: string | null;
  updatedAt: string | null;
  isDeleted: boolean;
  deletedAt: string | null;
}

export interface TPageInfo {
  totalCount: number;
  pageIndex: number;
  pageSize: number;
}
