import { BaseService } from '../base.service';
import { MONNIFY_ENDPOINTS } from '../constants';
import {
  TransactionListRequest,
  TransactionLogRequest,
  RefundTransactionRequest,
  PartialRefundRequest,
  TransactionVerificationRequest,
  TransactionDetails,
  TransactionListResponse,
  TransactionLogResponse,
  RefundResponse,
  TransactionVerificationResponse,
  TransactionSummary,
  TransactionAnalytics,
  MonnifyResponse,
} from '../interfaces';

export class TransactionsService extends BaseService {
  /**
   * Get transaction status by reference
   */
  async getTransactionStatus(
    transactionReference: string,
  ): Promise<MonnifyResponse<TransactionDetails>> {
    return this.post<MonnifyResponse<TransactionDetails>>(
      MONNIFY_ENDPOINTS.GET_TRANSACTION_STATUS,
      { transactionReference },
    );
  }

  /**
   * Get all transactions with optional filters
   */
  async getAllTransactions(
    request: TransactionListRequest = {},
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.get<MonnifyResponse<TransactionListResponse>>(
      MONNIFY_ENDPOINTS.GET_ALL_TRANSACTIONS,
      request,
    );
  }

  /**
   * Get transaction logs with optional filters
   */
  async getTransactionLogs(
    request: TransactionLogRequest = {},
  ): Promise<MonnifyResponse<TransactionLogResponse>> {
    return this.get<MonnifyResponse<TransactionLogResponse>>(
      MONNIFY_ENDPOINTS.GET_TRANSACTION_LOGS,
      request,
    );
  }

  /**
   * Refund a transaction (full refund)
   */
  async refundTransaction(
    request: RefundTransactionRequest,
  ): Promise<MonnifyResponse<RefundResponse>> {
    return this.post<MonnifyResponse<RefundResponse>>(
      MONNIFY_ENDPOINTS.REFUND_TRANSACTION,
      request,
    );
  }

  /**
   * Process a partial refund for a transaction
   */
  async partialRefundTransaction(
    request: PartialRefundRequest,
  ): Promise<MonnifyResponse<RefundResponse>> {
    return this.post<MonnifyResponse<RefundResponse>>(
      MONNIFY_ENDPOINTS.PARTIAL_REFUND_TRANSACTION,
      request,
    );
  }

  /**
   * Verify a transaction
   */
  async verifyTransaction(
    request: TransactionVerificationRequest,
  ): Promise<MonnifyResponse<TransactionVerificationResponse>> {
    return this.post<MonnifyResponse<TransactionVerificationResponse>>(
      MONNIFY_ENDPOINTS.VERIFY_TRANSACTION,
      request,
    );
  }

  /**
   * Get transaction summary
   */
  async getTransactionSummary(
    fromDate?: string,
    toDate?: string,
  ): Promise<MonnifyResponse<TransactionSummary>> {
    const params: Record<string, any> = {};
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;

    return this.get<MonnifyResponse<TransactionSummary>>(
      MONNIFY_ENDPOINTS.GET_TRANSACTION_SUMMARY,
      params,
    );
  }

  /**
   * Get transaction analytics
   */
  async getTransactionAnalytics(
    fromDate?: string,
    toDate?: string,
  ): Promise<MonnifyResponse<TransactionAnalytics>> {
    const params: Record<string, any> = {};
    if (fromDate) params.fromDate = fromDate;
    if (toDate) params.toDate = toDate;

    return this.get<MonnifyResponse<TransactionAnalytics>>(
      MONNIFY_ENDPOINTS.GET_TRANSACTION_ANALYTICS,
      params,
    );
  }

  /**
   * Get transactions by status
   */
  async getTransactionsByStatus(
    status: string,
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getAllTransactions({
      status: status as any,
      pageSize,
      pageNumber,
    });
  }

  /**
   * Get transactions by payment method
   */
  async getTransactionsByPaymentMethod(
    paymentMethod: string,
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getAllTransactions({
      paymentMethod: paymentMethod as any,
      pageSize,
      pageNumber,
    });
  }

  /**
   * Get transactions by date range
   */
  async getTransactionsByDateRange(
    fromDate: string,
    toDate: string,
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getAllTransactions({
      fromDate,
      toDate,
      pageSize,
      pageNumber,
    });
  }

  /**
   * Get transactions by customer email
   */
  async getTransactionsByCustomerEmail(
    customerEmail: string,
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getAllTransactions({
      customerEmail,
      pageSize,
      pageNumber,
    });
  }

  /**
   * Get transactions by amount range
   */
  async getTransactionsByAmount(
    amount: number,
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getAllTransactions({
      amount,
      pageSize,
      pageNumber,
    });
  }

  /**
   * Get successful transactions
   */
  async getSuccessfulTransactions(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getTransactionsByStatus('PAID', pageSize, pageNumber);
  }

  /**
   * Get failed transactions
   */
  async getFailedTransactions(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getTransactionsByStatus('FAILED', pageSize, pageNumber);
  }

  /**
   * Get pending transactions
   */
  async getPendingTransactions(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getTransactionsByStatus('PENDING', pageSize, pageNumber);
  }

  /**
   * Get cancelled transactions
   */
  async getCancelledTransactions(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getTransactionsByStatus('CANCELLED', pageSize, pageNumber);
  }

  /**
   * Get overpaid transactions
   */
  async getOverpaidTransactions(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getTransactionsByStatus('OVERPAID', pageSize, pageNumber);
  }

  /**
   * Get partially paid transactions
   */
  async getPartiallyPaidTransactions(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getTransactionsByStatus('PARTIALLY_PAID', pageSize, pageNumber);
  }

  /**
   * Get reversed transactions
   */
  async getReversedTransactions(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<TransactionListResponse>> {
    return this.getTransactionsByStatus('REVERSED', pageSize, pageNumber);
  }
}
