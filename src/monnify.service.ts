import { Injectable, Inject } from '@nestjs/common';
import { MONNIFY_MODULE_OPTIONS } from './constants';
import { MonnifyModuleOptions } from './interfaces';
import { CollectionsService } from './services/collections.service';
import { DisbursementsService } from './services/disbursements.service';
import { WalletsService } from './services/wallets.service';
import { VerificationService } from './services/verification.service';
import { SubAccountsService } from './services/sub_accounts.service';
import { InvoicesService } from './services/invoices.service';
import { SettlementsService } from './services/settlements.service';
import { TransactionsService } from './services/transactions.service';

@Injectable()
export class MonnifyService {
  public readonly collections: CollectionsService;
  public readonly disbursements: DisbursementsService;
  public readonly wallets: WalletsService;
  public readonly verification: VerificationService;
  public readonly subAccounts: SubAccountsService;
  public readonly invoices: InvoicesService;
  public readonly settlements: SettlementsService;
  public readonly transactions: TransactionsService;

  constructor(
    @Inject(MONNIFY_MODULE_OPTIONS)
    private readonly options: MonnifyModuleOptions,
  ) {
    this.collections = new CollectionsService(this.options);
    this.disbursements = new DisbursementsService(this.options);
    this.wallets = new WalletsService(this.options);
    this.verification = new VerificationService(this.options);
    this.subAccounts = new SubAccountsService(this.options);
    this.invoices = new InvoicesService(this.options);
    this.settlements = new SettlementsService(this.options);
    this.transactions = new TransactionsService(this.options);
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
