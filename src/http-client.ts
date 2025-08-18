import { RetryOptions } from './interfaces';

export interface HttpRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
}

export interface HttpResponse<T = any> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export class HttpClient {
  async request<T = any>(
    options: HttpRequestOptions,
    retryOptions: RetryOptions,
  ): Promise<HttpResponse<T>> {
    let lastError: Error;

    for (let attempt = 0; attempt <= retryOptions.retries; attempt++) {
      try {
        const response = await this.makeRequest<T>(options);
        return response;
      } catch (error) {
        lastError = error as Error;

        if (attempt === retryOptions.retries) {
          break;
        }

        // Wait before retrying
        const delay = Math.min(
          retryOptions.retryDelay * Math.pow(2, attempt),
          retryOptions.maxRetryDelay,
        );

        await this.sleep(delay);
      }
    }

    throw lastError!;
  }

  private async makeRequest<T = any>(
    options: HttpRequestOptions,
  ): Promise<HttpResponse<T>> {
    const { method, url, headers = {}, body, timeout = 30000 } = options;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        data,
        status: response.status,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${timeout}ms`);
        }
        throw error;
      }

      throw new Error('Unknown error occurred');
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
