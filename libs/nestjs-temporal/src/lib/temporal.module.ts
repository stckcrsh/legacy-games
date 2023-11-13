import { DynamicModule, Module, Provider } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { RuntimeOptions, WorkerOptions } from '@temporalio/worker';

import {
  SharedWorkerAsyncConfiguration,
  TemporalModuleOptions,
} from './interfaces';
import { TemporalMetadataAccessor } from './temporal-metadata.accessors';
import {
  TEMPORAL_CORE_CONFIG,
  TEMPORAL_WORKER_CONFIG,
} from './temporal.constants';
import { TemporalExplorer } from './temporal.explorer';
import {
  ClientOptionsFactory,
  createClientConfigProvider,
  createClientConfigProviderAsync,
  createClientProvider,
} from './temporal.providers';

@Module({})
export class TemporalModule {
  static forRoot(
    workerConfig: WorkerOptions,
    runtimeConfig?: RuntimeOptions,
  ): DynamicModule {
    const workerConfigProvider: Provider = {
      provide: TEMPORAL_WORKER_CONFIG,
      useValue: workerConfig,
    };

    const coreConfigProvider: Provider = {
      provide: TEMPORAL_CORE_CONFIG,
      useValue: runtimeConfig || {},
    };

    return {
      global: true,
      module: TemporalModule,
      providers: [workerConfigProvider, coreConfigProvider],
      imports: [TemporalModule.registerCore()],
    };
  }

  static forRootAsync(
    asyncWorkerConfig: SharedWorkerAsyncConfiguration,
    asyncCoreConfig?: RuntimeOptions,
  ): DynamicModule {
    const providers: Provider[] = [this.createAsyncProvider(asyncWorkerConfig)];

    const coreConfigProvider: Provider = {
      provide: TEMPORAL_CORE_CONFIG,
      useValue: asyncCoreConfig || {},
    };

    return {
      global: true,
      module: TemporalModule,
      providers: [...providers, coreConfigProvider],
      imports: [TemporalModule.registerCore()],
      exports: providers,
    };
  }

  private static createAsyncProvider(
    options: SharedWorkerAsyncConfiguration,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: TEMPORAL_WORKER_CONFIG,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
  }

  static registerClientAsync(
    option?: Omit<ClientOptionsFactory, 'provide'>,
  ): DynamicModule {
    const clientConfigProvider = createClientConfigProviderAsync(option);
    const clientProvider = createClientProvider();
    return {
      global: true,
      module: TemporalModule,
      providers: [clientConfigProvider, clientProvider],
      exports: [clientProvider],
    };
  }

  static registerClient(options?: TemporalModuleOptions): DynamicModule {
    const clientProvider = createClientProvider();
    return {
      global: true,
      module: TemporalModule,
      providers: [createClientConfigProvider(options), clientProvider],
      exports: [clientProvider],
    };
  }

  private static registerCore() {
    return {
      global: true,
      module: TemporalModule,
      imports: [DiscoveryModule],
      providers: [TemporalExplorer, TemporalMetadataAccessor],
    };
  }
}
