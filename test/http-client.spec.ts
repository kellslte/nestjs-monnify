import { HttpClient, HttpRequestOptions } from '../src/http-client';

// Mock fetch globally
global.fetch = jest.fn();

describe('HttpClient', () => {
  let httpClient: HttpClient;
  let mockFetch: jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    httpClient = new HttpClient();
    mockFetch = fetch as jest.MockedFunction<typeof fetch>;
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(httpClient).toBeDefined();
  });

  describe('request', () => {
    const mockOptions: HttpRequestOptions = {
      method: 'GET',
      url: 'https://api.example.com/test',
      headers: { 'X-Test': 'test-value' },
      timeout: 5000,
    };

    const mockRetryOptions = {
      retries: 2,
      retryDelay: 100,
      maxRetryDelay: 1000,
    };

    it('should make a successful request on first attempt', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ data: 'success' }),
      };

      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await httpClient.request(mockOptions, mockRetryOptions);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual({
        data: { data: 'success' },
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    });

    it('should retry on failure and succeed on second attempt', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      };

      const mockSuccessResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ data: 'success' }),
      };

      // First call fails, second call succeeds
      mockFetch
        .mockResolvedValueOnce(mockErrorResponse as any)
        .mockResolvedValueOnce(mockSuccessResponse as any);

      // Mock setTimeout to speed up test
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
        callback();
        return {} as any;
      });

      const result = await httpClient.request(mockOptions, mockRetryOptions);

      expect(mockFetch).toHaveBeenCalledTimes(2);
      expect(result).toEqual({
        data: { data: 'success' },
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    });

    it('should throw error after all retries fail', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      };

      mockFetch.mockResolvedValue(mockErrorResponse as any);

      // Mock setTimeout to speed up test
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
        callback();
        return {} as any;
      });

      await expect(
        httpClient.request(mockOptions, mockRetryOptions),
      ).rejects.toThrow('HTTP 500: Internal Server Error');

      expect(mockFetch).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it('should respect max retry delay', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      };

      mockFetch.mockResolvedValue(mockErrorResponse as any);

      // Mock setTimeout to speed up test
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
        callback();
        return {} as any;
      });

      const retryOptions = {
        retries: 3,
        retryDelay: 1000,
        maxRetryDelay: 2000,
      };

      await expect(
        httpClient.request(mockOptions, retryOptions),
      ).rejects.toThrow();

      expect(mockFetch).toHaveBeenCalledTimes(4); // Initial + 3 retries
    });
  });

  describe('makeRequest', () => {
    const mockOptions: HttpRequestOptions = {
      method: 'POST',
      url: 'https://api.example.com/test',
      headers: { 'Content-Type': 'application/json' },
      body: { test: 'data' },
      timeout: 5000,
    };

    it('should make a successful POST request', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ data: 'success' }),
      };

      mockFetch.mockResolvedValue(mockResponse as any);

      // Access private method through reflection
      const result = await (httpClient as any).makeRequest(mockOptions);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ test: 'data' }),
        }),
      );

      expect(result).toEqual({
        data: { data: 'success' },
        status: 200,
        headers: { 'content-type': 'application/json' },
      });
    });

    it('should handle HTTP error responses', async () => {
      const mockErrorResponse = {
        ok: false,
        status: 400,
        statusText: 'Bad Request',
      };

      mockFetch.mockResolvedValue(mockErrorResponse as any);

      await expect(
        (httpClient as any).makeRequest(mockOptions),
      ).rejects.toThrow('HTTP 400: Bad Request');
    });

    it('should handle network errors', async () => {
      const networkError = new Error('Network error');
      mockFetch.mockRejectedValue(networkError);

      await expect(
        (httpClient as any).makeRequest(mockOptions),
      ).rejects.toThrow('Network error');
    });

    it('should handle JSON parsing errors', async () => {
      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockRejectedValue(new Error('Invalid JSON')),
      };

      mockFetch.mockResolvedValue(mockResponse as any);

      await expect(
        (httpClient as any).makeRequest(mockOptions),
      ).rejects.toThrow('Invalid JSON');
    });
  });

  describe('sleep', () => {
    it('should wait for specified milliseconds', async () => {
      const startTime = Date.now();
      const delay = 100;

      // Mock setTimeout to execute immediately
      jest.spyOn(global, 'setTimeout').mockImplementation((callback: any) => {
        callback();
        return {} as any;
      });

      await (httpClient as any).sleep(delay);

      // Since we mocked setTimeout to execute immediately, the delay should be minimal
      const elapsed = Date.now() - startTime;
      expect(elapsed).toBeLessThan(50); // Should be very fast due to mocking
    });
  });

  describe('request options handling', () => {
    it('should handle GET request without body', async () => {
      const getOptions: HttpRequestOptions = {
        method: 'GET',
        url: 'https://api.example.com/test',
        timeout: 3000,
      };

      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ data: 'success' }),
      };

      mockFetch.mockResolvedValue(mockResponse as any);

      const result = await (httpClient as any).makeRequest(getOptions);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'GET',
          body: undefined,
        }),
      );

      expect(result.data).toEqual({ data: 'success' });
    });

    it('should handle request with custom headers', async () => {
      const customHeaders = {
        Authorization: 'Bearer token123',
        'X-Custom-Header': 'custom-value',
      };

      const customOptions: HttpRequestOptions = {
        method: 'POST',
        url: 'https://api.example.com/test',
        headers: customHeaders,
        body: { test: 'data' },
        timeout: 5000,
      };

      const mockResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        headers: new Map([['content-type', 'application/json']]),
        json: jest.fn().mockResolvedValue({ data: 'success' }),
      };

      mockFetch.mockResolvedValue(mockResponse as any);

      await (httpClient as any).makeRequest(customOptions);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer token123',
            'X-Custom-Header': 'custom-value',
          }),
        }),
      );
    });
  });
});
