import { BaseService } from '../base.service';
import { MONNIFY_ENDPOINTS } from '../constants';
import {
  SettlementListRequest,
  SettlementListResponse,
  SettlementDetailsRequest,
  SettlementDetailsResponse,
  SettlementSummaryRequest,
  SettlementSummaryResponse,
  SettlementTransactionsRequest,
  SettlementTransactionsResponse,
  SettlementStatusUpdateRequest,
  SettlementStatusUpdateResponse,
  SettlementConfigurationRequest,
  SettlementConfigurationResponse,
  SettlementConfigurationListResponse,
  UpdateSettlementConfigurationRequest,
  UpdateSettlementConfigurationResponse,
  DeleteSettlementConfigurationResponse,
  SettlementPayoutRequest,
  SettlementPayoutResponse,
  SettlementPayoutStatusResponse,
  MonnifyResponse,
} from '../interfaces';

export class SettlementsService extends BaseService {
  /**
   * Get list of settlements
   */
  async getSettlements(
    request: SettlementListRequest = {},
  ): Promise<MonnifyResponse<SettlementListResponse>> {
    const {
      pageSize = 10,
      pageNumber = 1,
      fromDate,
      toDate,
      status,
      settlementReference,
    } = request;

    return this.get<MonnifyResponse<SettlementListResponse>>(
      MONNIFY_ENDPOINTS.GET_SETTLEMENTS,
      {
        pageSize,
        pageNumber,
        fromDate,
        toDate,
        status,
        settlementReference,
      },
    );
  }

  /**
   * Get settlement details by reference
   */
  async getSettlementDetails(
    request: SettlementDetailsRequest,
  ): Promise<MonnifyResponse<SettlementDetailsResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.GET_SETTLEMENT_DETAILS.replace(
      '{settlementReference}',
      request.settlementReference,
    );
    return this.get<MonnifyResponse<SettlementDetailsResponse>>(endpoint);
  }

  /**
   * Get settlement summary
   */
  async getSettlementSummary(
    request: SettlementSummaryRequest = {},
  ): Promise<MonnifyResponse<SettlementSummaryResponse>> {
    const { fromDate, toDate, status } = request;

    return this.get<MonnifyResponse<SettlementSummaryResponse>>(
      MONNIFY_ENDPOINTS.GET_SETTLEMENT_SUMMARY,
      {
        fromDate,
        toDate,
        status,
      },
    );
  }

  /**
   * Get settlement transactions
   */
  async getSettlementTransactions(
    request: SettlementTransactionsRequest,
  ): Promise<MonnifyResponse<SettlementTransactionsResponse>> {
    const { settlementReference, pageSize = 10, pageNumber = 1 } = request;

    const endpoint = MONNIFY_ENDPOINTS.GET_SETTLEMENT_TRANSACTIONS.replace(
      '{settlementReference}',
      settlementReference,
    );

    return this.get<MonnifyResponse<SettlementTransactionsResponse>>(endpoint, {
      pageSize,
      pageNumber,
    });
  }

  /**
   * Update settlement status
   */
  async updateSettlementStatus(
    request: SettlementStatusUpdateRequest,
  ): Promise<MonnifyResponse<SettlementStatusUpdateResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.UPDATE_SETTLEMENT_STATUS.replace(
      '{settlementReference}',
      request.settlementReference,
    );
    return this.put<MonnifyResponse<SettlementStatusUpdateResponse>>(
      endpoint,
      request,
    );
  }

  /**
   * Create settlement configuration
   */
  async createSettlementConfiguration(
    request: SettlementConfigurationRequest,
  ): Promise<MonnifyResponse<SettlementConfigurationResponse>> {
    return this.post<MonnifyResponse<SettlementConfigurationResponse>>(
      MONNIFY_ENDPOINTS.CREATE_SETTLEMENT_CONFIGURATION,
      request,
    );
  }

  /**
   * Get settlement configurations
   */
  async getSettlementConfigurations(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<SettlementConfigurationListResponse>> {
    return this.get<MonnifyResponse<SettlementConfigurationListResponse>>(
      MONNIFY_ENDPOINTS.GET_SETTLEMENT_CONFIGURATIONS,
      {
        pageSize,
        pageNumber,
      },
    );
  }

  /**
   * Update settlement configuration
   */
  async updateSettlementConfiguration(
    request: UpdateSettlementConfigurationRequest,
  ): Promise<MonnifyResponse<UpdateSettlementConfigurationResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.UPDATE_SETTLEMENT_CONFIGURATION.replace(
      '{configurationId}',
      request.configurationId,
    );
    return this.put<MonnifyResponse<UpdateSettlementConfigurationResponse>>(
      endpoint,
      request,
    );
  }

  /**
   * Delete settlement configuration
   */
  async deleteSettlementConfiguration(
    configurationId: string,
  ): Promise<MonnifyResponse<DeleteSettlementConfigurationResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.DELETE_SETTLEMENT_CONFIGURATION.replace(
      '{configurationId}',
      configurationId,
    );
    return this.delete<MonnifyResponse<DeleteSettlementConfigurationResponse>>(
      endpoint,
    );
  }

  /**
   * Initiate settlement payout
   */
  async initiateSettlementPayout(
    request: SettlementPayoutRequest,
  ): Promise<MonnifyResponse<SettlementPayoutResponse>> {
    return this.post<MonnifyResponse<SettlementPayoutResponse>>(
      MONNIFY_ENDPOINTS.INITIATE_SETTLEMENT_PAYOUT,
      request,
    );
  }

  /**
   * Get settlement payout status
   */
  async getSettlementPayoutStatus(
    payoutReference: string,
  ): Promise<MonnifyResponse<SettlementPayoutStatusResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.GET_SETTLEMENT_PAYOUT_STATUS.replace(
      '{payoutReference}',
      payoutReference,
    );
    return this.get<MonnifyResponse<SettlementPayoutStatusResponse>>(endpoint);
  }

  /**
   * Get settlement by date range
   */
  async getSettlementsByDateRange(
    fromDate: string,
    toDate: string,
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<SettlementListResponse>> {
    return this.get<MonnifyResponse<SettlementListResponse>>(
      MONNIFY_ENDPOINTS.GET_SETTLEMENTS_BY_DATE_RANGE,
      {
        fromDate,
        toDate,
        pageSize,
        pageNumber,
      },
    );
  }

  /**
   * Get pending settlements
   */
  async getPendingSettlements(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<SettlementListResponse>> {
    return this.get<MonnifyResponse<SettlementListResponse>>(
      MONNIFY_ENDPOINTS.GET_PENDING_SETTLEMENTS,
      {
        pageSize,
        pageNumber,
      },
    );
  }

  /**
   * Get completed settlements
   */
  async getCompletedSettlements(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<SettlementListResponse>> {
    return this.get<MonnifyResponse<SettlementListResponse>>(
      MONNIFY_ENDPOINTS.GET_COMPLETED_SETTLEMENTS,
      {
        pageSize,
        pageNumber,
      },
    );
  }
}
