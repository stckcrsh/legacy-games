import { Test, TestingModule } from '@nestjs/testing';
import { GameRuntimeService } from './game-runtime.service';

describe('GameRuntimeService', () => {
  let service: GameRuntimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameRuntimeService],
    }).compile();

    service = module.get<GameRuntimeService>(GameRuntimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
