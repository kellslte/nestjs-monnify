export interface MonnifyModuleOptions {
  secretKey: string;
  publicKey: string;
  contractCode: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  maxRetryDelay?: number;
  environment?: 'sandbox' | 'production';
}

export interface RetryOptions {
  retries: number;
  retryDelay: number;
  maxRetryDelay: number;
}

export interface MonnifyResponse<T = any> {
  requestSuccessful: boolean;
  responseMessage: string;
  responseCode: string;
  responseBody: T;
}

export interface MonnifyError {
  requestSuccessful: boolean;
  responseMessage: string;
  responseCode: string;
  responseBody: null;
}
