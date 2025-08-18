export interface InitializeTransactionRequest {
  amount: number;
  customerName: string;
  customerEmail: string;
  paymentReference: string;
  paymentDescription: string;
  currencyCode?: string;
  contractCode: string;
  redirectUrl?: string;
  paymentMethods?: string[];
  metadata?: Record<string, any>;
}

export interface InitializeTransactionResponse {
  transactionReference: string;
  paymentReference: string;
  merchantName: string;
  apiKey: string;
  enabledPaymentMethod: string[];
  checkoutUrl: string;
  amount: number;
  currencyCode: string;
  contractCode: string;
  customerEmail: string;
  customerName: string;
  paymentDescription: string;
  redirectUrl: string;
  paymentMethods: string[];
  metadata: Record<string, any>;
}

export interface TransactionStatusResponse {
  transactionReference: string;
  paymentReference: string;
  amountPaid: number;
  paidOn: string;
  transactionStatus: string;
  transactionHash: string;
  transactionType: string;
  currencyCode: string;
  paymentMethod: string;
  customer: {
    email: string;
    name: string;
  };
  metaData: Record<string, any>;
}

export interface ReservedAccountRequest {
  accountReference: string;
  accountName: string;
  customerEmail: string;
  customerName: string;
  customerBvn?: string;
  currencyCode?: string;
  contractCode: string;
  getAllAvailableBanks?: boolean;
  preferredBanks?: string[];
  metadata?: Record<string, any>;
}

export interface ReservedAccountResponse {
  accountReference: string;
  accountNumber: string;
  accountName: string;
  customerEmail: string;
  customerName: string;
  currencyCode: string;
  contractCode: string;
  bankCode: string;
  bankName: string;
  status: string;
  createdOn: string;
  getAllAvailableBanks: boolean;
  preferredBanks: string[];
  metadata: Record<string, any>;
}
