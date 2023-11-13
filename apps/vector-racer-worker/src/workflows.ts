import { defineQuery, defineSignal, proxyActivities, setHandler } from '@temporalio/workflow';
import { Chassis, DeckDto, Map, Part } from '@vector-racer/lib';

import type * as activities from './activities';

export const playerLoadout =
  defineSignal<[{ userId: string; parts: Part[] }]>('loadout');

export const playerMove = defineSignal<
  [
    {
      racerId: string;
      cursor: [number, number];
      cards: DeckDto;
    }
  ]
>('move');

const { notifyHumanForVerification, startGame, resolveMoves } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: '1 minute',
});

const stateQuery = defineQuery<any>('state');
const dataQuery = defineQuery<any>('data');

export async function VectorGame(
  players: { userId: string }[],
  chassis: Chassis,
  map: Map
) {
  setHandler(stateQuery, () => {
    return 'waiting for players to join';
  });
  const resolvers: Record<
    string,
    (props: { userId: string; parts: Part[] }) => void
  > = players.reduce((acc, player) => {
    acc[player.userId] = null;
    return acc;
  }, {});

  setHandler(playerLoadout, ({ userId, parts }) => {
    notifyHumanForVerification(userId);

    if (userId in resolvers) {
      resolvers[userId]({ parts, userId });
    }
  });

  // Waiting for all players to finish setup
  // TODO validate submitted loadouts
  const playerLoadouts = await Promise.all(
    players.map((player) => {
      return new Promise<{ userId: string; parts: Part[] }>((resolve) => {
        resolvers[player.userId] = resolve;
      });
    })
  );

  setHandler(stateQuery, () => {
    return 'waiting for players to move';
  });

  notifyHumanForVerification('done');

  let game = await startGame(
    [
      ...playerLoadouts.map((player) => {
        return {
          id: player.userId,
          name: player.userId,
          chassis: chassis,
          parts: player.parts,
        };
      }),
    ],
    map
  );

  const resolvers2: Record<
    string,
    (props: {
      racerId: string;
      cursor: [number, number];
      cards: DeckDto;
    }) => void
  > = players.reduce((acc, player) => {
    acc[player.userId] = null;
    return acc;
  }, {});

  setHandler(
    playerMove,
    (args: { racerId: string; cursor: [number, number]; cards: DeckDto }) => {
      if (args.racerId in resolvers2) {
        resolvers2[args.racerId](args);
      }
    }
  );

  // Waiting for all players to finish setup
  // TODO validate submitted loadouts
  const playerMoves = await Promise.all(
    players.map((player) => {
      return new Promise<{
        racerId: string;
        cursor: [number, number];
        cards: DeckDto;
      }>((resolve) => {
        resolvers2[player.userId] = resolve;
      });
    })
  );

  setHandler(dataQuery, () => {
    return game;
  });

  do {
    game = await resolveMoves(game, playerMoves);
  } while (!game.isGameOver);
}
