import { BaseService } from '../base.service';
import { MONNIFY_ENDPOINTS } from '../constants';
import {
  CreateWalletRequest,
  WalletResponse,
  WalletBalanceResponse,
  WalletStatementRequest,
  WalletStatementResponse,
  MonnifyResponse,
} from '../interfaces';

export class WalletsService extends BaseService {
  /**
   * Create a new wallet
   */
  async createWallet(
    request: CreateWalletRequest,
  ): Promise<MonnifyResponse<WalletResponse>> {
    return this.post<MonnifyResponse<WalletResponse>>(
      MONNIFY_ENDPOINTS.CREATE_WALLET,
      {
        ...request,
        contractCode: this.options.contractCode,
      },
    );
  }

  /**
   * Get all wallets
   */
  async getWallets(
    pageSize: number = 10,
    pageNumber: number = 1,
  ): Promise<MonnifyResponse<any>> {
    return this.get<MonnifyResponse<any>>(MONNIFY_ENDPOINTS.GET_WALLETS, {
      pageSize,
      pageNumber,
    });
  }

  /**
   * Get wallet balance
   */
  async getWalletBalance(
    walletReference: string,
  ): Promise<MonnifyResponse<WalletBalanceResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.GET_WALLET_BALANCE.replace(
      '{walletReference}',
      walletReference,
    );
    return this.get<MonnifyResponse<WalletBalanceResponse>>(endpoint);
  }

  /**
   * Get wallet statement
   */
  async getWalletStatement(
    request: WalletStatementRequest,
  ): Promise<MonnifyResponse<WalletStatementResponse>> {
    const endpoint = MONNIFY_ENDPOINTS.GET_WALLET_STATEMENT.replace(
      '{walletReference}',
      request.walletReference,
    );
    return this.get<MonnifyResponse<WalletStatementResponse>>(endpoint, {
      fromDate: request.fromDate,
      toDate: request.toDate,
      pageSize: request.pageSize,
      pageNumber: request.pageNumber,
    });
  }
}
