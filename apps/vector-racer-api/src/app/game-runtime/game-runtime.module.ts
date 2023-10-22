import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { GameRuntimeController } from './game-runtime.controller';
import { GameRuntimeService } from './game-runtime.service';

@Module({
  imports: [AuthModule],
  controllers: [GameRuntimeController],
  providers: [GameRuntimeService],
})
export class GameRuntimeModule {}
