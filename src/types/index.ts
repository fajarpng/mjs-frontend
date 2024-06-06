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
  rakCode: string;
  rakName: string;
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
// interface rak
export interface TRak {
  id: number;
  rakCode: string;
  rakName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface TStockDetail {
  id: number;
  numberTrans: string;
  qty: number;
  productCode: string;
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
// interface budel
export interface TBundling {
  id: number;
  bundlingCode: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: number;
  updatedBy?: number;
}
// interface bundel detail
export interface TBundlingDetail {
  bundlingCode: string;
  qty: number;
  details: TBundleDetail[];
}

export interface TBundleDetail {
  id: number;
  bundlingCode: string;
  componentCode: string;
  qty: number;
}
//stock opnames
export interface TStockOpname {
  id: number;
  code: string;
  status: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  isDeleted: boolean;
  createdBy?: number;
  updatedBy?: number;
  deletedBy?: number;
  details: TDetailOpname[];
}

export interface TDetailOpname {
  id: number;
  opnameId: number;
  productId: number;
  qty: number;
  createdAt: Date;
  updatedAt: Date;
}
