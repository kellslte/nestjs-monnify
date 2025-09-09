import { BaseService } from '../base.service';
import { MONNIFY_ENDPOINTS } from '../constants';
import {
  CreateSubAccountRequest,
  CreateSubAccountResponse,
  UpdateSubAccountRequest,
  UpdateSubAccountResponse,
  SubAccountDetails,
  SubAccountListRequest,
  SubAccountListResponse,
  SubAccountTransactionRequest,
  SubAccountTransactionResponse,
  SubAccountSettlementRequest,
  SubAccountSettlementResponse,
  SubAccountBalanceResponse,
  DeactivateSubAccountRequest,
  DeactivateSubAccountResponse,
  MonnifyResponse,
} from '../interfaces';

export class SubAccountsService extends BaseService {
  /**
   * Create a new sub-account
   */
  async createSubAccount(
    request: CreateSubAccountRequest,
  ): Promise<MonnifyResponse<CreateSubAccountResponse>> {
    return this.post<MonnifyResponse<CreateSubAccountResponse>>(
      MONNIFY_ENDPOINTS.CREATE_SUB_ACCOUNT,
      {
        ...request,
        contractCode: this.options.contractCode,
      },
    );
  }

  /**
   * Update an existing sub-account
   */
  async updateSubAccount(
    request: UpdateSubAccountRequest,
  ): Promise<MonnifyResponse<UpdateSubAccountResponse>> {
    return this.put<MonnifyResponse<UpdateSubAccountResponse>>(
      MONNIFY_ENDPOINTS.UPDATE_SUB_ACCOUNT.replace(
        '{subAccountCode}',
        request.subAccountCode,
      ),
      request,
    );
  }

  /**
   * Get sub-account details by sub-account code
   */
  async getSubAccountDetails(
    subAccountCode: string,
  ): Promise<MonnifyResponse<SubAccountDetails>> {
    const endpoint = MONNIFY_ENDPOINTS.GET_SUB_ACCOUNT_DETAILS.replace(
      '{subAccountCode}',
      subAccountCode,
    );
    return this.get<MonnifyResponse<SubAccountDetails>>(endpoint);
  }

  /**
   * Get list of sub-accounts
   */
  async getSubAccounts(
    request: SubAccountListRequest = {},
  ): Promise<MonnifyResponse<SubAccountListResponse>> {
    const { pageSize = 10, pageNumber = 1, subAccountCode, status } = request;

    return this.get<MonnifyResponse<SubAccountListResponse>>(
      MONNIFY_ENDPOINTS.GET_SUB_ACCOUNTS,
      {
        pageSize,
        pageNumber,
        subAccountCode,
        status,
      },
    );
  }

  /**
   * Get sub-account transactions
   */
  async getSubAccountTransactions(
    request: SubAccountTransactionRequest,
  ): Promise<MonnifyResponse<SubAccountTransactionResponse>> {
    const {
      subAccountCode,
      pageSize = 10,
      pageNumber = 1,
      fromDate,
      toDate,
    } = request;

    const endpoint = MONNIFY_ENDPOINTS.GET_SUB_ACCOUNT_TRANSACTIONS.replace(
      '{subAccountCode}',
      subAccountCode,
    );

    return this.get<MonnifyResponse<SubAccountTransactionResponse>>(endpoint, {
      pageSize,
      pageNumber,
      fromDate,
      toDate,
    });
  }

  /**
   * Get sub-account settlements
   */
  async getSubAccountSettlements(
    request: SubAccountSettlementRequest,
  ): Promise<MonnifyResponse<SubAccountSettlementResponse>> {
    const {
      subAccountCode,
      pageSize = 10,
      pageNumber = 1,
      fromDate,
      toDate,
    } = request;

    const endpoint = MONNIFY_ENDPOINTS.GET_SUB_ACCOUNT_SETTLEMENTS.replace(
      '{subAccountCode}',
      subAccountCode,
    );

    return this.get<MonnifyResponse<SubAccountSettlementResponse>>(endpoint, {
      pageSize,
      pageNumber,
      fromDate,
      toDate,
    });
  }

  /**
   * Get sub-account balance
   */
  async getSubAccountBalance(
    subAccountCode: string,
  ): Promise<MonnifyResponse<SubAccountBalanceResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.GET_SUB_ACCOUNT_BALANCE.replace(
      '{subAccountCode}',
      subAccountCode,
    );
    return this.get<MonnifyResponse<SubAccountBalanceResponse>>(endpoint);
  }

  /**
   * Deactivate a sub-account
   */
  async deactivateSubAccount(
    request: DeactivateSubAccountRequest,
  ): Promise<MonnifyResponse<DeactivateSubAccountResponse>> {
    return this.put<MonnifyResponse<DeactivateSubAccountResponse>>(
      MONNIFY_ENDPOINTS.DEACTIVATE_SUB_ACCOUNT.replace(
        '{subAccountCode}',
        request.subAccountCode,
      ),
      request,
    );
  }

  /**
   * Reactivate a sub-account
   */
  async reactivateSubAccount(
    subAccountCode: string,
  ): Promise<MonnifyResponse<SubAccountDetails>> {
    const endpoint = MONNIFY_ENDPOINTS.REACTIVATE_SUB_ACCOUNT.replace(
      '{subAccountCode}',
      subAccountCode,
    );
    return this.put<MonnifyResponse<SubAccountDetails>>(endpoint, {});
  }
}
