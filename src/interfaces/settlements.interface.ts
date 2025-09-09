import { Metadata } from './common.interface';

// Settlement List
export interface SettlementListRequest {
  pageSize?: number;
  pageNumber?: number;
  fromDate?: string;
  toDate?: string;
  status?: string;
  settlementReference?: string;
}

export interface SettlementDetails {
  settlementReference: string;
  settlementId: string;
  totalAmount: number;
  totalFee: number;
  netAmount: number;
  currency: string;
  status: string;
  settlementDate: string;
  createdOn: string;
  updatedOn: string;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  transactionCount: number;
  metadata: Metadata;
}

export interface SettlementListResponse {
  content: SettlementDetails[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// Settlement Details
export interface SettlementDetailsRequest {
  settlementReference: string;
}

export interface SettlementDetailsResponse {
  settlementReference: string;
  settlementId: string;
  totalAmount: number;
  totalFee: number;
  netAmount: number;
  currency: string;
  status: string;
  settlementDate: string;
  createdOn: string;
  updatedOn: string;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  transactionCount: number;
  metadata: Metadata;
  transactions: SettlementTransaction[];
}

export interface SettlementTransaction {
  transactionReference: string;
  paymentReference: string;
  amount: number;
  fee: number;
  netAmount: number;
  currency: string;
  status: string;
  paidOn: string;
  paymentMethod: string;
  customer: {
    email: string;
    name: string;
  };
  metadata: Metadata;
}

// Settlement Summary
export interface SettlementSummaryRequest {
  fromDate?: string;
  toDate?: string;
  status?: string;
}

export interface SettlementSummaryResponse {
  totalSettlements: number;
  totalAmount: number;
  totalFee: number;
  netAmount: number;
  currency: string;
  period: {
    fromDate: string;
    toDate: string;
  };
  statusBreakdown: {
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  };
  amountBreakdown: {
    pending: number;
    processing: number;
    completed: number;
    failed: number;
  };
}

// Settlement Transactions
export interface SettlementTransactionsRequest {
  settlementReference: string;
  pageSize?: number;
  pageNumber?: number;
}

export interface SettlementTransactionsResponse {
  content: SettlementTransaction[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// Settlement Status Update
export interface SettlementStatusUpdateRequest {
  settlementReference: string;
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  reason?: string;
}

export interface SettlementStatusUpdateResponse {
  settlementReference: string;
  status: string;
  updatedOn: string;
  reason?: string;
}

// Settlement Configuration
export interface SettlementConfigurationRequest {
  bankCode: string;
  accountNumber: string;
  accountName: string;
  isDefault?: boolean;
  metadata?: Metadata;
}

export interface SettlementConfigurationResponse {
  configurationId: string;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isDefault: boolean;
  status: string;
  createdOn: string;
  updatedOn: string;
  metadata: Metadata;
}

// Settlement Configuration List
export interface SettlementConfigurationListResponse {
  content: SettlementConfigurationResponse[];
  pageSize: number;
  pageNumber: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// Settlement Configuration Update
export interface UpdateSettlementConfigurationRequest {
  configurationId: string;
  bankCode?: string;
  accountNumber?: string;
  accountName?: string;
  isDefault?: boolean;
  metadata?: Metadata;
}

export interface UpdateSettlementConfigurationResponse {
  configurationId: string;
  bankCode: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isDefault: boolean;
  status: string;
  createdOn: string;
  updatedOn: string;
  metadata: Metadata;
}

// Settlement Configuration Delete
export interface DeleteSettlementConfigurationResponse {
  configurationId: string;
  deleted: boolean;
  deletedOn: string;
}

// Settlement Payout
export interface SettlementPayoutRequest {
  settlementReference: string;
  payoutMethod: 'BANK_TRANSFER' | 'WALLET';
  destinationAccount?: string;
  destinationBankCode?: string;
  destinationAccountName?: string;
  walletReference?: string;
  metadata?: Metadata;
}

export interface SettlementPayoutResponse {
  payoutReference: string;
  settlementReference: string;
  payoutMethod: string;
  amount: number;
  currency: string;
  status: string;
  initiatedOn: string;
  completedOn?: string;
  failureReason?: string;
  metadata: Metadata;
}

// Settlement Payout Status
export interface SettlementPayoutStatusResponse {
  payoutReference: string;
  settlementReference: string;
  payoutMethod: string;
  amount: number;
  currency: string;
  status: string;
  initiatedOn: string;
  completedOn?: string;
  failureReason?: string;
  metadata: Metadata;
}
