import { BaseService } from '../base.service';
import { MONNIFY_ENDPOINTS } from '../constants';
import {
  BvnVerificationRequest,
  BvnVerificationResponse,
  BankAccountVerificationRequest,
  BankAccountVerificationResponse,
  PhoneNumberVerificationRequest,
  PhoneNumberVerificationResponse,
  MonnifyResponse,
} from '../interfaces';

export class VerificationService extends BaseService {
  /**
   * Verify BVN (Bank Verification Number)
   */
  async verifyBvn(
    request: BvnVerificationRequest,
  ): Promise<MonnifyResponse<BvnVerificationResponse>> {
    return this.post<MonnifyResponse<BvnVerificationResponse>>(
      MONNIFY_ENDPOINTS.VERIFY_BVN,
      request,
    );
  }

  /**
   * Verify bank account details
   */
  async verifyBankAccount(
    request: BankAccountVerificationRequest,
  ): Promise<MonnifyResponse<BankAccountVerificationResponse>> {
    return this.post<MonnifyResponse<BankAccountVerificationResponse>>(
      MONNIFY_ENDPOINTS.VERIFY_BANK_ACCOUNT,
      request,
    );
  }

  /**
   * Verify phone number
   */
  async verifyPhoneNumber(
    request: PhoneNumberVerificationRequest,
  ): Promise<MonnifyResponse<PhoneNumberVerificationResponse>> {
    return this.post<MonnifyResponse<PhoneNumberVerificationResponse>>(
      MONNIFY_ENDPOINTS.VERIFY_PHONE_NUMBER,
      request,
    );
  }
}
