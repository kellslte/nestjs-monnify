export interface SingleTransferRequest {
  amount: number;
  reference: string;
  narration: string;
  destinationBankCode: string;
  destinationAccountNumber: string;
  destinationAccountName: string;
  currency: string;
  sourceAccountNumber: string;
  metadata?: Record<string, any>;
}

export interface BulkTransferRequest {
  title: string;
  batchReference: string;
  narration: string;
  sourceAccountNumber: string;
  currency: string;
  onValidationFailure: 'CONTINUE' | 'STOP';
  notificationInterval: number;
  transactions: Array<{
    amount: number;
    reference: string;
    narration: string;
    destinationBankCode: string;
    destinationAccountNumber: string;
    destinationAccountName: string;
    metadata?: Record<string, any>;
  }>;
}

export interface TransferResponse {
  reference: string;
  amount: number;
  status: string;
  narration: string;
  destinationBankCode: string;
  destinationAccountNumber: string;
  destinationAccountName: string;
  currency: string;
  sourceAccountNumber: string;
  metadata: Record<string, any>;
  createdOn: string;
  updatedOn: string;
}

export interface BulkTransferResponse {
  batchReference: string;
  totalAmount: number;
  totalFee: number;
  totalCount: number;
  successfulCount: number;
  failedCount: number;
  pendingCount: number;
  status: string;
  createdOn: string;
  updatedOn: string;
  transactions: TransferResponse[];
}
