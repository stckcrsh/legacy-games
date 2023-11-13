import { Test, TestingModule } from '@nestjs/testing';

import { AuthModule } from '../auth/auth.module';
import { GameRuntimeController } from './game-runtime.controller';

describe('GameRuntimeController', () => {
  let controller: GameRuntimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[AuthModule],
      controllers: [GameRuntimeController],
    }).compile();

    controller = module.get<GameRuntimeController>(GameRuntimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
