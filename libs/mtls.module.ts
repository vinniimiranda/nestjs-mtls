import { DynamicModule, Module, Provider } from '@nestjs/common';
import {
  IMtlsModuleOptions,
  MtlsModuleAsyncOptions,
  MtlsModuleOptions,
  MtlsOptionsFactory,
} from './interfaces/mtls-module.options';

@Module({})
export class PassportModule {
  static register(options: IMtlsModuleOptions): DynamicModule {
    return {
      module: PassportModule,
      providers: [{ provide: MtlsModuleOptions, useValue: options }],
      exports: [MtlsModuleOptions],
    };
  }

  static registerAsync(options: MtlsModuleAsyncOptions): DynamicModule {
    return {
      module: PassportModule,
      imports: options.imports || [],
      providers: this.createAsyncProviders(options),
      exports: [MtlsModuleOptions],
    };
  }

  private static createAsyncProviders(options: MtlsModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass!,
        useClass: options.useClass!,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: MtlsModuleAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: MtlsModuleOptions,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: MtlsModuleOptions,
      useFactory: async (optionsFactory: MtlsOptionsFactory) => await optionsFactory.createMtlsOptions(),
      inject: [options.useExisting! || options.useClass!],
    };
  }
}
