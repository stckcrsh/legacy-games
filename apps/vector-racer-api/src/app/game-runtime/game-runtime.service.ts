import Victor from 'victor';

import { Injectable } from '@nestjs/common';
import { Racer, accelerate, betterWheels, lateralPlus } from '@vector-racer/lib';

import { Game } from './game';
import { Map, scaleMap } from './map.utils';
import * as maps from './maps.json';

const map = scaleMap(maps.basic as unknown as Map, 1.65);

const racer: Racer = {
  id: '1',
  name: 'player1',
  moves: [],
  position: map.start.positions[0],
  vector: map.start.positions[0],
  backwardScale: 1,
  forwardScale: 1,
  lateralScale: 1,
  lateralSteps:1,
  forwardSteps:1,
  backwardSteps:1,
  laps: -1,
  deck: [],
  hand: [
    ['1', lateralPlus.id],
    ['2', accelerate.id],
    ['3', betterWheels.id],
    ['4', betterWheels.id],
  ],
};

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
          position: [2, 2],
          vector: [2, 2],
          laps: -1,
          backwardScale: 1,
          forwardScale: 1,
          lateralScale: 1,
          lateralSteps: 1,
          forwardSteps: 1,
          backwardSteps: 1,
          deck: [],
          hand: [],
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
    game.resolveMove({
      racerId: userId,
      cursor: Victor.fromObject(move.cursor),
    });

    return game;
  }
}
