import { Injectable } from '@nestjs/common';
import { Game } from './game';
import Victor from 'victor';
import * as maps from './maps.json';
import { Racer } from './models';
import { VectorService } from './vector.service';
import { Map, scaleMap } from './map.utils';

const map = scaleMap(maps.basic as unknown as Map, 1.65);

const racer: Racer = {
  id: '1',
  name: 'player1',
  moves: [],
  position: Victor.fromArray(map.start.positions[0]),
  vector: Victor.fromArray(map.start.positions[0]),
  backwardScale: 1,
  forwardScale: 1,
  lateralScale: 1,
  laps: -1,
};

racer.possibleVectors = VectorService.createPossibleVectors(racer);

const gameDB: Record<string, Game> = {
  '1': new Game({
    racers: {
      '1': racer,
    },
    map,
  }),
};

@Injectable()
export class GameRuntimeService {
  create() {
    const game = new Game({
      racers: {
        '1': {
          id: '1',
          name: 'player1',
          moves: [],
          position: new Victor(2, 2),
          vector: new Victor(2, 2),

          laps: -1,
        },
      },
      map: maps.small as any,
    });

    const id = Math.random().toString();
    gameDB[id] = game;
    return id;
  }

  findAll() {
    return Object.keys(gameDB);
  }

  findOne(id: string) {
    return gameDB[id];
  }

  move(id: string, move: any, userId: string) {
    const game = gameDB[id];
    const newGameState = game.resolveMove({
      racerId: userId,
      cursor: Victor.fromObject(move.cursor),
    });

    gameDB[id] = new Game(newGameState);
    return newGameState;
  }
}
