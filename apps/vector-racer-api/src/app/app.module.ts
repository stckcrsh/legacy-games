import path from 'path';

import { TemporalModule } from '@legacy-games/temporal';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Connection } from '@temporalio/client';
import { NativeConnection } from '@temporalio/worker';

import { GameRuntimeModule } from './game-runtime/game-runtime.module';
import { PlayerModule } from './players/player.module';

@Module({
  imports: [
    GameRuntimeModule,
    PlayerModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TemporalModule.forRootAsync({
      //@ts-ignore
      useFactory: async () => {
        const connection = await NativeConnection.connect();

        return {
          namespace: 'default',
          connection,
          taskQueue: 'vector-racer',
          workflowsPath: path.join(__dirname, 'workflows/index.js'),
        } as WorkerOptions;
      },
    }),
    TemporalModule.registerClientAsync({
      useFactory: async () => {
        const connection = await Connection.connect();

        return {
          namespace: 'default',
          connection,
        };
      },
      inject: [],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
