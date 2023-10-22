import { Module } from '@nestjs/common';

import { GameRuntimeModule } from './game-runtime/game-runtime.module';

@Module({
  imports: [GameRuntimeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
