import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthUser } from '../auth/auth.decorators';
import { AuthGuard } from '../auth/auth.guard';

@Controller('player')
@UseGuards(AuthGuard)
export class PlayerController {
  @Get('')
  getUser(@AuthUser() user) {
    return user;
  }

  @Get('inventory')
  move(@AuthUser() user): any {
    return user.inventory;
  }
}
