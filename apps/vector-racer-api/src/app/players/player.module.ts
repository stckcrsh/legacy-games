import { Module } from '@nestjs/common';

import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PlayerController } from './player.controller';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [PlayerController],
  providers: [],
  exports: [],
})
export class PlayerModule {}
