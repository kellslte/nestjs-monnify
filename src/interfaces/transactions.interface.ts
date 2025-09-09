// No imports needed for this file

// Transaction Status Types
export type TransactionStatus =
  | 'PENDING'
  | 'PAID'
  | 'OVERPAID'
  | 'PARTIALLY_PAID'
  | 'CANCELLED'
  | 'FAILED'
  | 'REVERSED';

export type TransactionPaymentMethod =
  | 'CARD'
  | 'ACCOUNT_TRANSFER'
  | 'USSD'
  | 'QR_CODE'
  | 'BANK_TRANSFER';

export type PaymentProvider =
  | 'FLUTTERWAVE'
  | 'PAYSTACK'
  | 'MONNIFY'
  | 'INTERSWITCH';

// Transaction Request Interfaces
export interface TransactionQueryRequest {
  transactionReference: string;
}

export interface TransactionListRequest {
  pageSize?: number;
  pageNumber?: number;
  fromDate?: string;
  toDate?: string;
  status?: TransactionStatus;
  paymentMethod?: TransactionPaymentMethod;
  customerEmail?: string;
  customerName?: string;
  amount?: number;
  currency?: string;
}

export interface TransactionLogRequest {
  pageSize?: number;
  pageNumber?: number;
  fromDate?: string;
  toDate?: string;
  transactionReference?: string;
  status?: TransactionStatus;
}

export interface RefundTransactionRequest {
  transactionReference: string;
  refundAmount: number;
  refundReason: string;
  customerNote?: string;
}

export interface PartialRefundRequest {
  transactionReference: string;
  refundAmount: number;
  refundReason: string;
  customerNote?: string;
}

export interface TransactionVerificationRequest {
  transactionReference: string;
  amount?: number;
}

// Transaction Response Interfaces
export interface TransactionDetails {
  transactionReference: string;
  paymentReference: string;
  amountPaid: string;
  totalPayable: string;
  settlementAmount: string;
  paidOn: string;
  paymentStatus: TransactionStatus;
  paymentDescription: string;
  currency: string;
  paymentMethod: TransactionPaymentMethod;
  customer: {
    email: string;
    name: string;
    phoneNumber: string;
  };
  metaData: Record<string, any>;
  paymentProvider: PaymentProvider;
  product: {
    type: string;
    reference: string;
  };
  cardDetails?: {
    cardType: string;
    last4: string;
    expMonth: string;
    expYear: string;
    countryCode: string;
  };
  accountDetails?: {
    accountNumber: string;
    accountName: string;
    bankCode: string;
    bankName: string;
  };
  amount: number;
  fee: number;
  feeBearer: boolean;
  completed: boolean;
  completedOn?: string;
  createdOn: string;
  updatedOn: string;
}

export interface TransactionListResponse {
  content: TransactionDetails[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export interface TransactionLogEntry {
  id: string;
  transactionReference: string;
  amount: number;
  paymentMethod: TransactionPaymentMethod;
  paymentProvider: PaymentProvider;
  status: TransactionStatus;
  customerEmail: string;
  customerName: string;
  createdOn: string;
  updatedOn: string;
  completedOn?: string;
  description: string;
  currency: string;
  fee: number;
  feeBearer: boolean;
  metaData: Record<string, any>;
}

export interface TransactionLogResponse {
  content: TransactionLogEntry[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export interface RefundResponse {
  transactionReference: string;
  paymentReference: string;
  amount: number;
  refundAmount: number;
  totalRefunded: number;
  refundReference: string;
  refundStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  refundReason: string;
  customerNote?: string;
  refundedOn?: string;
  createdOn: string;
  updatedOn: string;
}

export interface TransactionVerificationResponse {
  transactionReference: string;
  paymentReference: string;
  amountPaid: string;
  totalPayable: string;
  settlementAmount: string;
  paidOn: string;
  paymentStatus: TransactionStatus;
  paymentDescription: string;
  currency: string;
  paymentMethod: TransactionPaymentMethod;
  customer: {
    email: string;
    name: string;
    phoneNumber: string;
  };
  metaData: Record<string, any>;
  paymentProvider: PaymentProvider;
  product: {
    type: string;
    reference: string;
  };
  amount: number;
  fee: number;
  feeBearer: boolean;
  completed: boolean;
  completedOn?: string;
  createdOn: string;
  updatedOn: string;
}

export interface TransactionSummary {
  totalTransactions: number;
  totalAmount: number;
  totalFees: number;
  totalRefunds: number;
  successfulTransactions: number;
  failedTransactions: number;
  pendingTransactions: number;
  cancelledTransactions: number;
  currency: string;
  period: {
    fromDate: string;
    toDate: string;
  };
}

export interface TransactionAnalytics {
  totalVolume: number;
  totalCount: number;
  averageTransactionValue: number;
  successRate: number;
  failureRate: number;
  refundRate: number;
  topPaymentMethods: Array<{
    method: TransactionPaymentMethod;
    count: number;
    percentage: number;
  }>;
  topPaymentProviders: Array<{
    provider: PaymentProvider;
    count: number;
    percentage: number;
  }>;
  dailyBreakdown: Array<{
    date: string;
    count: number;
    volume: number;
  }>;
  currency: string;
  period: {
    fromDate: string;
    toDate: string;
  };
}
