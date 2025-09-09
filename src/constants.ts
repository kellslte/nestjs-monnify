export const MONNIFY_MODULE_OPTIONS = 'MONNIFY_MODULE_OPTIONS';

export const MONNIFY_API_BASE_URL = 'https://sandbox-api.monnify.com';
export const MONNIFY_API_BASE_URL_PRODUCTION = 'https://api.monnify.com';

export const MONNIFY_ENDPOINTS = {
  // Collections
  INITIALIZE_TRANSACTION: '/api/v1/merchant/transactions/init-transaction',
  GET_TRANSACTION_STATUS: '/api/v1/merchant/transactions/query',
  GET_ALL_TRANSACTIONS: '/api/v1/merchant/transactions/list',
  GET_TRANSACTION_LOGS: '/api/v1/merchant/transactions/transaction-log',

  // Customer Reserved Account
  CREATE_RESERVED_ACCOUNT: '/api/v1/bank-transfer/reserved-accounts/create',
  GET_RESERVED_ACCOUNTS: '/api/v1/bank-transfer/reserved-accounts',
  GET_RESERVED_ACCOUNT_TRANSACTIONS:
    '/api/v1/bank-transfer/reserved-accounts/transactions',

  // Invoice
  CREATE_INVOICE: '/api/v1/merchant/invoices/create',
  GET_INVOICES: '/api/v1/merchant/invoices',
  GET_INVOICE: '/api/v1/merchant/invoices/{invoiceReference}',
  CANCEL_INVOICE: '/api/v1/merchant/invoices/{invoiceReference}/cancel',

  // Disbursements
  INITIATE_SINGLE_TRANSFER: '/api/v1/disbursements/single',
  INITIATE_BULK_TRANSFER: '/api/v1/disbursements/bulk',
  GET_TRANSFER_STATUS: '/api/v1/disbursements/{reference}',
  GET_TRANSFER_LOGS: '/api/v1/disbursements/logs',

  // Wallets
  CREATE_WALLET: '/api/v1/wallets/create',
  GET_WALLETS: '/api/v1/wallets',
  GET_WALLET_BALANCE: '/api/v1/wallets/{walletReference}/balance',
  GET_WALLET_STATEMENT: '/api/v1/wallets/{walletReference}/statement',

  // Verification
  VERIFY_BVN: '/api/v1/vas/bvn-verification',
  VERIFY_BANK_ACCOUNT: '/api/v1/vas/bank-account-verification',
  VERIFY_PHONE_NUMBER: '/api/v1/vas/phone-number-verification',

  // Sub Accounts
  CREATE_SUB_ACCOUNT: '/api/v1/subaccounts/create',
  UPDATE_SUB_ACCOUNT: '/api/v1/subaccounts/{subAccountCode}/update',
  GET_SUB_ACCOUNT_DETAILS: '/api/v1/subaccounts/{subAccountCode}',
  GET_SUB_ACCOUNTS: '/api/v1/subaccounts',
  GET_SUB_ACCOUNT_TRANSACTIONS:
    '/api/v1/subaccounts/{subAccountCode}/transactions',
  GET_SUB_ACCOUNT_SETTLEMENTS:
    '/api/v1/subaccounts/{subAccountCode}/settlements',
  GET_SUB_ACCOUNT_BALANCE: '/api/v1/subaccounts/{subAccountCode}/balance',
  DEACTIVATE_SUB_ACCOUNT: '/api/v1/subaccounts/{subAccountCode}/deactivate',
  REACTIVATE_SUB_ACCOUNT: '/api/v1/subaccounts/{subAccountCode}/reactivate',

  // Invoices
  UPDATE_INVOICE: '/api/v1/merchant/invoices/{invoiceReference}/update',
  GET_INVOICE_PAYMENT_STATUS:
    '/api/v1/merchant/invoices/{invoiceReference}/payment-status',
  GET_INVOICE_TRANSACTIONS:
    '/api/v1/merchant/invoices/{invoiceReference}/transactions',
  GET_INVOICE_SUMMARY: '/api/v1/merchant/invoices/summary',
  SEND_INVOICE_REMINDER:
    '/api/v1/merchant/invoices/{invoiceReference}/reminder',
  RESEND_INVOICE_NOTIFICATION:
    '/api/v1/merchant/invoices/{invoiceReference}/resend',
  GET_INVOICE_BY_NUMBER: '/api/v1/merchant/invoices/number/{invoiceNumber}',

  // Settlements
  GET_SETTLEMENTS: '/api/v1/settlements',
  GET_SETTLEMENT_DETAILS: '/api/v1/settlements/{settlementReference}',
  GET_SETTLEMENT_SUMMARY: '/api/v1/settlements/summary',
  GET_SETTLEMENT_TRANSACTIONS:
    '/api/v1/settlements/{settlementReference}/transactions',
  UPDATE_SETTLEMENT_STATUS: '/api/v1/settlements/{settlementReference}/status',
  CREATE_SETTLEMENT_CONFIGURATION: '/api/v1/settlements/configuration/create',
  GET_SETTLEMENT_CONFIGURATIONS: '/api/v1/settlements/configuration',
  UPDATE_SETTLEMENT_CONFIGURATION:
    '/api/v1/settlements/configuration/{configurationId}/update',
  DELETE_SETTLEMENT_CONFIGURATION:
    '/api/v1/settlements/configuration/{configurationId}/delete',
  INITIATE_SETTLEMENT_PAYOUT: '/api/v1/settlements/payout',
  GET_SETTLEMENT_PAYOUT_STATUS: '/api/v1/settlements/payout/{payoutReference}',
  GET_SETTLEMENTS_BY_DATE_RANGE: '/api/v1/settlements/date-range',
  GET_PENDING_SETTLEMENTS: '/api/v1/settlements/pending',
  GET_COMPLETED_SETTLEMENTS: '/api/v1/settlements/completed',
} as const;
