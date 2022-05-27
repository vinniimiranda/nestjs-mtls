import { ModuleMetadata, Type } from '@nestjs/common';

export interface IMtlsModuleOptions<T = any> {
  defaultStrategy?: string | string[];
  session?: boolean;
  property?: string;
  [key: string]: any;
}

export interface MtlsOptionsFactory {
  createMtlsOptions(): Promise<IMtlsModuleOptions> | IMtlsModuleOptions;
}

export interface MtlsModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<MtlsOptionsFactory>;
  useClass?: Type<MtlsOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<IMtlsModuleOptions> | IMtlsModuleOptions;
  inject?: any[];
}

export class MtlsModuleOptions implements IMtlsModuleOptions {
  defaultStrategy?: string | string[];
  session?: boolean;
  property?: string;
}
