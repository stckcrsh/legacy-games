import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateGameRuntimeDto } from './models';
import { GameRuntimeService } from './game-runtime.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthUser } from '../auth/auth.decorators';
import { User } from '../users/user';
import { GameState } from '@vector-racer/lib';

@Controller('game-runtime')
@UseGuards(AuthGuard)
export class GameRuntimeController {
  constructor(private gameRuntimeService: GameRuntimeService) {}
  @Post('')
  create(@Body() createGameRuntimeDto: CreateGameRuntimeDto) {
    return this.gameRuntimeService.create();
  }

  @Get('')
  findAll() {
    return this.gameRuntimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @AuthUser() user: User):GameState {
    console.log(user)
    return this.gameRuntimeService.findOne(id) as unknown as GameState;
  }

  @Post(':id/move')
  move(@Param('id') id: string, @Body() move: any, @AuthUser() user: User) {
    return this.gameRuntimeService.move(id, move, user.userId);
  }
}
