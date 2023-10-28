import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GameState } from '@vector-racer/lib';

import { AuthUser } from '../auth/auth.decorators';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../users/user';
import { GameRuntimeService } from './game-runtime.service';
import { CreateGameRuntimeDto } from './models';

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
  findOne(@Param('id') id: string): GameState {
    return this.gameRuntimeService.findOne(id).toGameState();
  }

  @Post(':id/move')
  move(
    @Param('id') id: string,
    @Body() move: any,
  ): GameState {
    return this.gameRuntimeService.move(id, move, move.racerId).toGameState();
  }
}
