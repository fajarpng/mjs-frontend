import type { FC, SVGProps } from "react";

export interface TNav {
  type: "item" | "collapse";
  name: string;
  key: string;
  hidden?: boolean;
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
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
}

export interface TEmployee {
  nip: string;
  nik: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  religion: string;
  birthDate: string;
  joinDate: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
  role: "superAdmin" | "admin" | "staff";
  token: string;
}
