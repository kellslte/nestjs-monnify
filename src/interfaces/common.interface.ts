export interface PaginationRequest {
  pageSize?: number;
  pageNumber?: number;
}

export interface PaginationResponse {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
}

export interface Metadata {
  [key: string]: any;
}

export interface Customer {
  email: string;
  name: string;
  phoneNumber?: string;
  bvn?: string;
}

export interface Bank {
  code: string;
  name: string;
  longCode?: string;
  active?: boolean;
  country?: string;
  currency?: string;
  type?: string;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface PaymentMethod {
  code: string;
  name: string;
  description?: string;
  active?: boolean;
}
