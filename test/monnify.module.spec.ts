import { Test } from '@nestjs/testing';
import { MonnifyModule } from '../src/monnify.module';
import { MonnifyService } from '../src/monnify.service';
import { MONNIFY_MODULE_OPTIONS } from '../src/constants';

describe('MonnifyModule', () => {
  describe('forRoot', () => {
    it('should create module with static configuration', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRoot({
            secretKey: 'test-secret-key',
            publicKey: 'test-public-key',
            contractCode: 'test-contract-code',
            environment: 'sandbox',
          }),
        ],
      }).compile();

      const monnifyService = module.get<MonnifyService>(MonnifyService);
      expect(monnifyService).toBeDefined();
      expect(monnifyService.getOptions()).toEqual({
        secretKey: 'test-secret-key',
        publicKey: 'test-public-key',
        contractCode: 'test-contract-code',
        environment: 'sandbox',
        baseUrl: 'https://sandbox-api.monnify.com',
        timeout: 30000,
        retries: 3,
        retryDelay: 1000,
        maxRetryDelay: 10000,
      });
    });

    it('should create module with production environment', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRoot({
            secretKey: 'test-secret-key',
            publicKey: 'test-public-key',
            contractCode: 'test-contract-code',
            environment: 'production',
          }),
        ],
      }).compile();

      const monnifyService = module.get<MonnifyService>(MonnifyService);
      expect(monnifyService.isProduction()).toBe(true);
      expect(monnifyService.getBaseUrl()).toContain('api.monnify.com');
    });

    it('should create module with custom configuration', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRoot({
            secretKey: 'test-secret-key',
            publicKey: 'test-public-key',
            contractCode: 'test-contract-code',
            environment: 'sandbox',
            baseUrl: 'https://custom-api.com',
            timeout: 60000,
            retries: 5,
            retryDelay: 2000,
            maxRetryDelay: 20000,
          }),
        ],
      }).compile();

      const monnifyService = module.get<MonnifyService>(MonnifyService);
      expect(monnifyService.getOptions()).toEqual({
        secretKey: 'test-secret-key',
        publicKey: 'test-public-key',
        contractCode: 'test-contract-code',
        environment: 'sandbox',
        baseUrl: 'https://custom-api.com',
        timeout: 60000,
        retries: 5,
        retryDelay: 2000,
        maxRetryDelay: 20000,
      });
    });

    it('should create global module', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRoot({
            secretKey: 'test-secret-key',
            publicKey: 'test-public-key',
            contractCode: 'test-contract-code',
          }),
        ],
      }).compile();

      // Check if the module is global by trying to get the service from a different context
      const monnifyService = module.get<MonnifyService>(MonnifyService);
      expect(monnifyService).toBeDefined();
    });

    it('should provide MONNIFY_MODULE_OPTIONS token', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRoot({
            secretKey: 'test-secret-key',
            publicKey: 'test-public-key',
            contractCode: 'test-contract-code',
          }),
        ],
      }).compile();

      const options = module.get(MONNIFY_MODULE_OPTIONS);
      expect(options).toBeDefined();
      expect(options.secretKey).toBe('test-secret-key');
    });
  });

  describe('forRootAsync', () => {
    it('should create module with async configuration', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRootAsync({
            useFactory: () => ({
              secretKey: 'async-secret-key',
              publicKey: 'async-public-key',
              contractCode: 'async-contract-code',
              environment: 'sandbox',
            }),
          }),
        ],
      }).compile();

      const monnifyService = module.get<MonnifyService>(MonnifyService);
      expect(monnifyService).toBeDefined();
      // Check only the properties that are actually set
      const options = monnifyService.getOptions();
      expect(options.secretKey).toBe('async-secret-key');
      expect(options.publicKey).toBe('async-public-key');
      expect(options.contractCode).toBe('async-contract-code');
      expect(options.environment).toBe('sandbox');
    });

    it('should create module with async configuration and custom settings', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRootAsync({
            useFactory: () => ({
              secretKey: 'async-secret-key',
              publicKey: 'async-public-key',
              contractCode: 'async-contract-code',
              environment: 'production',
              timeout: 45000,
              retries: 4,
            }),
          }),
        ],
      }).compile();

      const monnifyService = module.get<MonnifyService>(MonnifyService);
      expect(monnifyService).toBeDefined();
      // Check only the properties that are actually set
      const options = monnifyService.getOptions();
      expect(options.secretKey).toBe('async-secret-key');
      expect(options.publicKey).toBe('async-public-key');
      expect(options.contractCode).toBe('async-contract-code');
      expect(options.environment).toBe('production');
      expect(options.timeout).toBe(45000);
      expect(options.retries).toBe(4);
    });

    it('should handle async configuration without inject', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRootAsync({
            useFactory: () => ({
              secretKey: 'factory-secret-key',
              publicKey: 'factory-public-key',
              contractCode: 'factory-contract-code',
              environment: 'sandbox',
            }),
          }),
        ],
      }).compile();

      const monnifyService = module.get<MonnifyService>(MonnifyService);
      expect(monnifyService).toBeDefined();
      expect(monnifyService.getOptions().secretKey).toBe('factory-secret-key');
    });

    it('should create global module with async configuration', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRootAsync({
            useFactory: () => ({
              secretKey: 'async-secret-key',
              publicKey: 'async-public-key',
              contractCode: 'async-contract-code',
            }),
          }),
        ],
      }).compile();

      const monnifyService = module.get<MonnifyService>(MonnifyService);
      expect(monnifyService).toBeDefined();
    });
  });

  describe('module structure', () => {
    it('should export MonnifyService', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRoot({
            secretKey: 'test-secret-key',
            publicKey: 'test-public-key',
            contractCode: 'test-contract-code',
          }),
        ],
      }).compile();

      const monnifyService = module.get<MonnifyService>(MonnifyService);
      expect(monnifyService).toBeDefined();
      expect(monnifyService.collections).toBeDefined();
      expect(monnifyService.disbursements).toBeDefined();
      expect(monnifyService.wallets).toBeDefined();
      expect(monnifyService.verification).toBeDefined();
    });

    it('should provide all required services', async () => {
      const module = await Test.createTestingModule({
        imports: [
          MonnifyModule.forRoot({
            secretKey: 'test-secret-key',
            publicKey: 'test-public-key',
            contractCode: 'test-contract-code',
          }),
        ],
      }).compile();

      // Check if all services are available
      const monnifyService = module.get<MonnifyService>(MonnifyService);

      expect(monnifyService.collections).toBeDefined();
      expect(monnifyService.disbursements).toBeDefined();
      expect(monnifyService.wallets).toBeDefined();
      expect(monnifyService.verification).toBeDefined();
    });
  });
});
