import {
  FactoryProvider,
  OnApplicationShutdown,
  Provider,
} from '@nestjs/common';
import { Client, ClientOptions, Connection } from '@temporalio/client';

import { TemporalModuleOptions } from './interfaces';
import { TEMPORAL_CLIENT_CONFIG } from './temporal.constants';
import { getQueueToken } from './utils';

export function buildClient(option: ClientOptions): Client {
  const client = new Client(option || {});

  (
    option.connection as unknown as OnApplicationShutdown
  ).onApplicationShutdown = function (this: Connection) {
    return this.client.close();
  };

  return client;
}

export function createClientProvider(): Provider<Client> {
  return {
    provide: getQueueToken(),
    useFactory: (clientConfig: ClientOptions) => {
      return buildClient(clientConfig);
    },
    inject: [TEMPORAL_CLIENT_CONFIG],
  };
}

export type ClientOptionsFactory = FactoryProvider<
  ClientOptions | Promise<ClientOptions>
>;

// needs to generate a config
// another provider needs to read the config and create and provide the client
export function createClientConfigProviderAsync(
  option: Omit<ClientOptionsFactory, 'provide'>,
): ClientOptionsFactory {
  return {
    provide: TEMPORAL_CLIENT_CONFIG,
    useFactory: option.useFactory,
    inject: option.inject || [],
  };
}

export function createClientConfigProvider(
  options: TemporalModuleOptions,
): ClientOptionsFactory {
  return {
    provide: TEMPORAL_CLIENT_CONFIG,
    useFactory: async () => {
      const connection = await Connection.connect(options.connection || {});
      return {
        connection,
        workflowOptions: options.workflowOptions,
      };
    },
  };
}
