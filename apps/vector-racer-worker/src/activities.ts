import Vector from 'victor';

import { Context } from '@temporalio/activity';
import { Chassis, DeckDto, GameStateDto, Part } from '@vector-racer/lib';

import { Game } from './game';
import { Map } from './map.utils';

interface NewRacer {
  chassis: Chassis;
  parts: Part[];
  id: string;
  name: string;
}

export async function startGame(
  racers: NewRacer[],
  map: Map
): Promise<GameStateDto> {
  const game = Game.newGame(racers, map);
  return game.toGameState();
}

export async function resolveMoves(
  game: GameStateDto,
  moves: {
      racerId: string;
      cursor: [number, number];
      cards: DeckDto,
    }[]
): Promise<GameStateDto> {
  const gameInstance = Game.fromGameState(game);

  moves.forEach((move) => {
    gameInstance.resolveAction({
      racerId: move.racerId,
      cursor: Vector.fromArray(move.cursor),
      cards: move.cards,
    });
  });

  // TODO: check for game over


  return gameInstance.toGameState();
}

export async function notifyHumanForVerification(task: string): Promise<void> {
  Context.current().log.info(
    `🤖 Dear human, please verify that this is correct: ${task}`
  );
}
