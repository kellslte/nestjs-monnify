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
} as const;
