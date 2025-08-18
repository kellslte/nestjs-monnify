import { Injectable, Inject } from '@nestjs/common';
import { MONNIFY_MODULE_OPTIONS } from './constants';
import { MonnifyModuleOptions } from './interfaces';
import { CollectionsService } from './services/collections.service';
import { DisbursementsService } from './services/disbursements.service';
import { WalletsService } from './services/wallets.service';
import { VerificationService } from './services/verification.service';

@Injectable()
export class MonnifyService {
  public readonly collections: CollectionsService;
  public readonly disbursements: DisbursementsService;
  public readonly wallets: WalletsService;
  public readonly verification: VerificationService;

  constructor(
    @Inject(MONNIFY_MODULE_OPTIONS)
    private readonly options: MonnifyModuleOptions,
  ) {
    this.collections = new CollectionsService(this.options);
    this.disbursements = new DisbursementsService(this.options);
    this.wallets = new WalletsService(this.options);
    this.verification = new VerificationService(this.options);
  }

  /**
   * Get the current configuration options
   */
  getOptions(): MonnifyModuleOptions {
    return this.options;
  }

  /**
   * Check if the service is configured for production
   */
  isProduction(): boolean {
    return this.options.environment === 'production';
  }

  /**
   * Get the current base URL
   */
  getBaseUrl(): string {
    return (
      this.options.baseUrl ||
      (this.options.environment === 'production'
        ? 'https://api.monnify.com'
        : 'https://sandbox-api.monnify.com')
    );
  }
}
