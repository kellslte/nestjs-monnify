import { BaseService } from '../base.service';
import { MONNIFY_ENDPOINTS } from '../constants';
import {
  SingleTransferRequest,
  BulkTransferRequest,
  TransferResponse,
  BulkTransferResponse,
  MonnifyResponse,
} from '../interfaces';

export class DisbursementsService extends BaseService {
  /**
   * Initiate a single transfer
   */
  async initiateSingleTransfer(
    request: SingleTransferRequest,
  ): Promise<MonnifyResponse<TransferResponse>> {
    return this.post<MonnifyResponse<TransferResponse>>(
      MONNIFY_ENDPOINTS.INITIATE_SINGLE_TRANSFER,
      request,
    );
  }

  /**
   * Initiate bulk transfers
   */
  async initiateBulkTransfer(
    request: BulkTransferRequest,
  ): Promise<MonnifyResponse<BulkTransferResponse>> {
    return this.post<MonnifyResponse<BulkTransferResponse>>(
      MONNIFY_ENDPOINTS.INITIATE_BULK_TRANSFER,
      request,
    );
  }

  /**
   * Get transfer status by reference
   */
  async getTransferStatus(
    reference: string,
  ): Promise<MonnifyResponse<TransferResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.GET_TRANSFER_STATUS.replace(
      '{reference}',
      reference,
    );
    return this.get<MonnifyResponse<TransferResponse>>(endpoint);
  }

  /**
   * Get transfer logs
   */
  async getTransferLogs(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<any>> {
    return this.get<MonnifyResponse<any>>(MONNIFY_ENDPOINTS.GET_TRANSFER_LOGS, {
      pageSize,
      pageNumber,
    });
  }
}
