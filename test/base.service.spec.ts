import { BaseService } from '../src/base.service';
import { MonnifyModuleOptions } from '../src/interfaces';

// Create a concrete implementation of BaseService for testing
class TestService extends BaseService {
  constructor(options: MonnifyModuleOptions) {
    super(options);
  }

  // Expose protected methods for testing
  public testGetBaseUrl(): string {
    return this.getBaseUrl();
  }

  public testGetHeaders(): Record<string, string> {
    return this.getHeaders();
  }

  public testGetRetryOptions() {
    return this.getRetryOptions();
  }

  public async testGet<T>(
    endpoint: string,
    params?: Record<string, any>,
  ): Promise<T> {
    return this.get<T>(endpoint, params);
  }

  public async testPost<T>(endpoint: string, data?: any): Promise<T> {
    return this.post<T>(endpoint, data);
  }

  public async testPut<T>(endpoint: string, data?: any): Promise<T> {
    return this.put<T>(endpoint, data);
  }

  public async testDelete<T>(endpoint: string): Promise<T> {
    return this.delete<T>(endpoint);
  }
}

describe('BaseService', () => {
  let service: TestService;
  let mockOptions: MonnifyModuleOptions;

  beforeEach(() => {
    mockOptions = {
      secretKey: 'test-secret-key',
      publicKey: 'test-public-key',
      contractCode: 'test-contract-code',
      environment: 'sandbox',
      timeout: 15000,
      retries: 5,
      retryDelay: 2000,
      maxRetryDelay: 15000,
    };
    service = new TestService(mockOptions);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have correct options', () => {
    expect(service['options']).toEqual(mockOptions);
  });

  it('should have http client', () => {
    expect(service['httpClient']).toBeDefined();
  });

  describe('getBaseUrl', () => {
    it('should return custom baseUrl when provided', () => {
      const customOptions = {
        ...mockOptions,
        baseUrl: 'https://custom-api.com',
      };
      const customService = new TestService(customOptions);

      expect(customService.testGetBaseUrl()).toBe('https://custom-api.com');
    });

    it('should return sandbox URL for sandbox environment', () => {
      expect(service.testGetBaseUrl()).toContain('sandbox-api.monnify.com');
    });

    it('should return production URL for production environment', () => {
      const prodOptions = {
        ...mockOptions,
        environment: 'production' as const,
      };
      const prodService = new TestService(prodOptions);

      expect(prodService.testGetBaseUrl()).toContain('api.monnify.com');
    });
  });

  describe('getHeaders', () => {
    it('should return correct headers', () => {
      const headers = service.testGetHeaders();

      expect(headers).toEqual({
        Authorization: 'Bearer test-secret-key',
        'Content-Type': 'application/json',
      });
    });
  });

  describe('getRetryOptions', () => {
    it('should return correct retry options', () => {
      const retryOptions = service.testGetRetryOptions();

      expect(retryOptions).toEqual({
        retries: 5,
        retryDelay: 2000,
        maxRetryDelay: 15000,
      });
    });

    it('should use default values when not provided', () => {
      const defaultOptions = {
        secretKey: 'test-secret-key',
        publicKey: 'test-public-key',
        contractCode: 'test-contract-code',
      };
      const defaultService = new TestService(defaultOptions);

      const retryOptions = defaultService.testGetRetryOptions();

      expect(retryOptions).toEqual({
        retries: 3,
        retryDelay: 1000,
        maxRetryDelay: 10000,
      });
    });
  });

  describe('HTTP methods', () => {
    beforeEach(() => {
      // Mock the httpClient methods
      jest.spyOn(service['httpClient'], 'request').mockResolvedValue({
        data: 'test-response',
        status: 200,
        headers: {},
      });
    });

    describe('get', () => {
      it('should call httpClient with correct parameters', async () => {
        const result = await service.testGet('/test-endpoint', {
          param1: 'value1',
        });

        expect(service['httpClient'].request).toHaveBeenCalledWith(
          {
            method: 'GET',
            url: expect.stringContaining('/test-endpoint'),
            headers: {
              Authorization: 'Bearer test-secret-key',
              'Content-Type': 'application/json',
            },
            timeout: 15000,
          },
          {
            retries: 5,
            retryDelay: 2000,
            maxRetryDelay: 15000,
          },
        );
        expect(result).toBe('test-response');
      });

      it('should handle endpoint without params', async () => {
        await service.testGet('/test-endpoint');

        expect(service['httpClient'].request).toHaveBeenCalledWith(
          {
            method: 'GET',
            url: expect.stringContaining('/test-endpoint'),
            headers: {
              Authorization: 'Bearer test-secret-key',
              'Content-Type': 'application/json',
            },
            timeout: 15000,
          },
          expect.any(Object),
        );
      });
    });

    describe('post', () => {
      it('should call httpClient with correct parameters', async () => {
        const testData = { key: 'value' };
        const result = await service.testPost('/test-endpoint', testData);

        expect(service['httpClient'].request).toHaveBeenCalledWith(
          {
            method: 'POST',
            url: expect.stringContaining('/test-endpoint'),
            headers: {
              Authorization: 'Bearer test-secret-key',
              'Content-Type': 'application/json',
            },
            body: testData,
            timeout: 15000,
          },
          expect.any(Object),
        );
        expect(result).toBe('test-response');
      });
    });

    describe('put', () => {
      it('should call httpClient with correct parameters', async () => {
        const testData = { key: 'updated-value' };
        const result = await service.testPut('/test-endpoint', testData);

        expect(service['httpClient'].request).toHaveBeenCalledWith(
          {
            method: 'PUT',
            url: expect.stringContaining('/test-endpoint'),
            headers: {
              Authorization: 'Bearer test-secret-key',
              'Content-Type': 'application/json',
            },
            body: testData,
            timeout: 15000,
          },
          expect.any(Object),
        );
        expect(result).toBe('test-response');
      });
    });

    describe('delete', () => {
      it('should call httpClient with correct parameters', async () => {
        const result = await service.testDelete('/test-endpoint');

        expect(service['httpClient'].request).toHaveBeenCalledWith(
          {
            method: 'DELETE',
            url: expect.stringContaining('/test-endpoint'),
            headers: {
              Authorization: 'Bearer test-secret-key',
              'Content-Type': 'application/json',
            },
            timeout: 15000,
          },
          expect.any(Object),
        );
        expect(result).toBe('test-response');
      });
    });
  });
});
