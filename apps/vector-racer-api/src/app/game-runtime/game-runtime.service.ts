import { v4 } from 'uuid';
import Vector from 'victor';

import { InjectTemporalClient } from '@legacy-games/temporal';
import { Injectable } from '@nestjs/common';
import { Client } from '@temporalio/client';
import { Map, maps, nascar, Part, RacerActionDto, scaleMap } from '@vector-racer/lib';

import { Game } from './game';

const map = scaleMap(maps.basic as unknown as Map, 1.65);

const gameDB: Record<string, Game> = {
  '1': Game.newGame(
    {
      '1': {
        id: '1',
        name: 'player1',
        chassis: nascar,
        parts: [],
      },
    },
    map
  ),
};

@Injectable()
export class GameRuntimeService {
  constructor(
    @InjectTemporalClient() private readonly temporalClient: Client
  ) {}

  create() {
    const workflowId = v4();
    this.temporalClient.workflow.start('VectorGame', {
      workflowId: workflowId,
      taskQueue: 'vector-racer',
      args: [
        [
          {
            userId: '1',
          },
        ],
        nascar,
        map,
      ],
    });

    return {
      id: workflowId,
    };
  }

  findAll() {
    return Object.keys(gameDB);
  }

  findOne(id: string) {
    return gameDB[id];
  }

  move(id: string, move: RacerActionDto, userId: string) {
    // const game = gameDB[id];
    // game.resolveAction({
    //   racerId: userId,
    //   cursor: Vector.fromArray(move.cursor),
    //   cards: move.cards,
    // });

    // return game;
    const handle = this.temporalClient.workflow.getHandle('1');
    // {
    //   racerId: string;
    //   cursor: [number, number];
    //   cards: DeckDto;
    // }
    handle.signal('player', {
      racerId: userId,
      cursor: move.cursor,
    });

    return gameDB[id];
  }

  join(id: string, userId: string, parts: Part[]) {
    const handle = this.temporalClient.workflow.getHandle('1');
    // { userId: string; parts: Part[] }
    handle.signal('loadout', {
      userId: userId,
      parts,
    });

    return gameDB[id];
  }
}
