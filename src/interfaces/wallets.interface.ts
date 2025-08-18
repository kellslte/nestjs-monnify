export interface CreateWalletRequest {
  walletReference: string;
  walletName: string;
  customerEmail: string;
  customerName: string;
  currencyCode?: string;
  contractCode: string;
  metadata?: Record<string, any>;
}

export interface WalletResponse {
  walletReference: string;
  walletName: string;
  customerEmail: string;
  customerName: string;
  currencyCode: string;
  contractCode: string;
  status: string;
  createdOn: string;
  updatedOn: string;
  metadata: Record<string, any>;
}

export interface WalletBalanceResponse {
  walletReference: string;
  walletName: string;
  balance: number;
  currencyCode: string;
  lastUpdated: string;
}

export interface WalletStatementRequest {
  walletReference: string;
  fromDate?: string;
  toDate?: string;
  pageSize?: number;
  pageNumber?: number;
}

export interface WalletStatementResponse {
  walletReference: string;
  transactions: Array<{
    reference: string;
    amount: number;
    type: 'CREDIT' | 'DEBIT';
    narration: string;
    balance: number;
    createdOn: string;
    metadata: Record<string, any>;
  }>;
  pagination: {
    pageSize: number;
    pageNumber: number;
    totalCount: number;
    totalPages: number;
  };
}
