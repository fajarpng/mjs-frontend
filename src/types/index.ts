import type { FC, SVGProps } from "react";

export interface TNav {
  type: "item" | "collapse";
  name: string;
  key: string;
  hidden?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
  children?: TNav[];
}

export interface TPageInfo {
  pageIndex: number;
  pageSize: number;
  pageCount: number;
  totalCount: number;
}
// interface Product
export interface TProduct {
  productId: number;
  productCode: string;
  productName: string;
  categoryCode: string;
  categoryName: string;
  barcode: string;
  description: string;
  qty: number;
  qtyMin: number;
  type: string;
  imageUrl: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  isDeleted: boolean;
  deletedAt: Date;
  deletedBy: string;
}
// interface employee
export interface TEmployee {
  id: number;
  nip: string;
  nik: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  religion: string;
  birthDate: string;
  joinDate: Date;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  role: "superAdmin" | "admin" | "staff";
  token: string;
}
// interface category
export interface TCategory {
  id: number;
  categoryCode: string;
  categoryName: string;
  updatedBy: string;
  createdBy: string;
  deletedBy: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
// interface stock
export interface TStock {
  id: number;
  number: string;
  type: string;
  notes: string;
  supplierCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: number;
  updatedBy: number;
}
// interface stock
export interface TStock {
  id: number;
  number: string;
  type: string;
  notes: string;
  supplierCode: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  createdBy: number;
  updatedBy: number;
}
// interface supplier
export interface TSupplier {
  id: number;
  supplierCode: string;
  supplierName: string;
  address: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
