import { DynamicModule, Module } from '@nestjs/common';
import { MONNIFY_MODULE_OPTIONS } from './constants';
import { MonnifyModuleOptions } from './interfaces';
import { MonnifyService } from './monnify.service';

@Module({})
export class MonnifyModule {
  static forRoot(options: MonnifyModuleOptions): DynamicModule {
    return {
      module: MonnifyModule,
      providers: [
        {
          provide: MONNIFY_MODULE_OPTIONS,
          useValue: {
            baseUrl:
              options.environment === 'production'
                ? 'https://api.monnify.com'
                : 'https://sandbox-api.monnify.com',
            timeout: 30000,
            retries: 3,
            retryDelay: 1000,
            maxRetryDelay: 10000,
            environment: 'sandbox',
            ...options,
          },
        },
        MonnifyService,
      ],
      exports: [MonnifyService],
      global: true,
    };
  }

  static forRootAsync(options: any): DynamicModule {
    return {
      module: MonnifyModule,
      imports: options.imports || [],
      providers: [
        {
          provide: MONNIFY_MODULE_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        MonnifyService,
      ],
      exports: [MonnifyService],
      global: true,
    };
  }
}
