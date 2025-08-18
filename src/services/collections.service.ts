import { BaseService } from '../base.service';
import { MONNIFY_ENDPOINTS } from '../constants';
import {
  InitializeTransactionRequest,
  InitializeTransactionResponse,
  TransactionStatusResponse,
  ReservedAccountRequest,
  ReservedAccountResponse,
  MonnifyResponse,
} from '../interfaces';

export class CollectionsService extends BaseService {
  /**
   * Initialize a new transaction
   */
  async initializeTransaction(
    request: InitializeTransactionRequest,
  ): Promise<MonnifyResponse<InitializeTransactionResponse>> {
    return this.post<MonnifyResponse<InitializeTransactionResponse>>(
      MONNIFY_ENDPOINTS.INITIALIZE_TRANSACTION,
      {
        ...request,
        contractCode: this.options.contractCode,
      },
    );
  }

  /**
   * Get transaction status by reference
   */
  async getTransactionStatus(
    transactionReference: string,
  ): Promise<MonnifyResponse<TransactionStatusResponse>> {
    return this.get<MonnifyResponse<TransactionStatusResponse>>(
      MONNIFY_ENDPOINTS.GET_TRANSACTION_STATUS,
      { transactionReference },
    );
  }

  /**
   * Get all transactions with pagination
   */
  async getAllTransactions(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<any>> {
    return this.get<MonnifyResponse<any>>(
      MONNIFY_ENDPOINTS.GET_ALL_TRANSACTIONS,
      {
        pageSize,
        pageNumber,
      },
    );
  }

  /**
   * Get transaction logs
   */
  async getTransactionLogs(
    transactionReference: string,
  ): Promise<MonnifyResponse<any>> {
    return this.get<MonnifyResponse<any>>(
      MONNIFY_ENDPOINTS.GET_TRANSACTION_LOGS,
      { transactionReference },
    );
  }

  /**
   * Create a reserved account for a customer
   */
  async createReservedAccount(
    request: ReservedAccountRequest,
  ): Promise<MonnifyResponse<ReservedAccountResponse>> {
    return this.post<MonnifyResponse<ReservedAccountResponse>>(
      MONNIFY_ENDPOINTS.CREATE_RESERVED_ACCOUNT,
      {
        ...request,
        contractCode: this.options.contractCode,
      },
    );
  }

  /**
   * Get all reserved accounts
   */
  async getReservedAccounts(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<any>> {
    return this.get<MonnifyResponse<any>>(
      MONNIFY_ENDPOINTS.GET_RESERVED_ACCOUNTS,
      {
        pageSize,
        pageNumber,
      },
    );
  }

  /**
   * Get transactions for a reserved account
   */
  async getReservedAccountTransactions(
    accountReference: string,
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<any>> {
    return this.get<MonnifyResponse<any>>(
      MONNIFY_ENDPOINTS.GET_RESERVED_ACCOUNT_TRANSACTIONS,
      { accountReference, pageSize, pageNumber },
    );
  }
}
