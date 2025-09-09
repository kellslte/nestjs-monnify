import { Metadata } from './common.interface';

// Sub Account Creation
export interface CreateSubAccountRequest {
  subAccountCode: string;
  subAccountName: string;
  email: string;
  mobileNumber: string;
  splitPercentage: number;
  feePercentage: number;
  feeBearer: boolean;
  splitType: 'PERCENTAGE' | 'FIXED';
  currencyCode: string;
  contractCode: string;
  accountReference?: string;
  metadata?: Metadata;
}

export interface CreateSubAccountResponse {
  subAccountCode: string;
  subAccountName: string;
  email: string;
  mobileNumber: string;
  splitPercentage: number;
  feePercentage: number;
  feeBearer: boolean;
  splitType: string;
  currencyCode: string;
  contractCode: string;
  accountReference: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  status: string;
  createdOn: string;
  metadata: Metadata;
}

// Sub Account Update
export interface UpdateSubAccountRequest {
  subAccountCode: string;
  subAccountName?: string;
  email?: string;
  mobileNumber?: string;
  splitPercentage?: number;
  feePercentage?: number;
  feeBearer?: boolean;
  splitType?: 'PERCENTAGE' | 'FIXED';
  metadata?: Metadata;
}

export interface UpdateSubAccountResponse {
  subAccountCode: string;
  subAccountName: string;
  email: string;
  mobileNumber: string;
  splitPercentage: number;
  feePercentage: number;
  feeBearer: boolean;
  splitType: string;
  currencyCode: string;
  contractCode: string;
  accountReference: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  status: string;
  createdOn: string;
  updatedOn: string;
  metadata: Metadata;
}

// Sub Account Details
export interface SubAccountDetails {
  subAccountCode: string;
  subAccountName: string;
  email: string;
  mobileNumber: string;
  splitPercentage: number;
  feePercentage: number;
  feeBearer: boolean;
  splitType: string;
  currencyCode: string;
  contractCode: string;
  accountReference: string;
  accountNumber: string;
  bankCode: string;
  bankName: string;
  status: string;
  createdOn: string;
  updatedOn?: string;
  metadata: Metadata;
}

// Sub Account List
export interface SubAccountListRequest {
  pageSize?: number;
  pageNumber?: number;
  subAccountCode?: string;
  status?: string;
}

export interface SubAccountListResponse {
  content: SubAccountDetails[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// Sub Account Transactions
export interface SubAccountTransactionRequest {
  subAccountCode: string;
  pageSize?: number;
  pageNumber?: number;
  fromDate?: string;
  toDate?: string;
}

export interface SubAccountTransaction {
  transactionReference: string;
  paymentReference: string;
  amountPaid: number;
  totalPayable: number;
  settlementAmount: number;
  paidOn: string;
  paymentStatus: string;
  paymentDescription: string;
  currency: string;
  paymentMethod: string;
  customer: {
    email: string;
    name: string;
  };
  metaData: Metadata;
}

export interface SubAccountTransactionResponse {
  content: SubAccountTransaction[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// Sub Account Settlement
export interface SubAccountSettlementRequest {
  subAccountCode: string;
  pageSize?: number;
  pageNumber?: number;
  fromDate?: string;
  toDate?: string;
}

export interface SubAccountSettlement {
  settlementReference: string;
  subAccountCode: string;
  subAccountName: string;
  amount: number;
  currency: string;
  status: string;
  settlementDate: string;
  createdOn: string;
  metadata: Metadata;
}

export interface SubAccountSettlementResponse {
  content: SubAccountSettlement[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// Sub Account Balance
export interface SubAccountBalanceResponse {
  subAccountCode: string;
  subAccountName: string;
  availableBalance: number;
  ledgerBalance: number;
  currency: string;
  lastUpdated: string;
}

// Sub Account Deactivation
export interface DeactivateSubAccountRequest {
  subAccountCode: string;
  reason?: string;
}

export interface DeactivateSubAccountResponse {
  subAccountCode: string;
  status: string;
  deactivatedOn: string;
  reason?: string;
}
