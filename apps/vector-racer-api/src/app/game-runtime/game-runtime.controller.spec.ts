import { Test, TestingModule } from '@nestjs/testing';
import { GameRuntimeController } from './game-runtime.controller';

describe('GameRuntimeController', () => {
  let controller: GameRuntimeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameRuntimeController],
    }).compile();

    controller = module.get<GameRuntimeController>(GameRuntimeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
