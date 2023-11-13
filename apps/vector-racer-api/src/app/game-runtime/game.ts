import { values } from 'lodash';
import Vector from 'victor';

import {
    angleOfVectorsRadians, Chassis, doIntersect, GameStateDto, getVelocity, nascar, Part
} from '@vector-racer/lib';

import { Map } from './map.utils';
import { Action } from './models';
import { Racer } from './racer';
import { shuffle } from './stack';

const getDeckId = (card: [string, string]) => card[0];

interface NewRacer {
  chassis: Chassis;
  parts: Part[];
  id: string;
  name: string;
}

/**
 * TODO: need to validate input vector
 */
export class Game {
  static newGame(racers: Record<string, NewRacer>, map: Map) {
    const game = new Game();
    game.racers = Object.fromEntries(
      Object.entries(racers).map(([id, racer]) => {
        return [id, Racer.newRacer(nascar, {}, racer.id, racer.name)];
      })
    );
    game.map = map;
    game.start();
    return game;
  }

  static fromGameState(state: GameStateDto) {
    const game = new Game();

    game.racers = Object.fromEntries(
      Object.entries(state.racers).map(([id, racer]): [string, Racer] => [
        id,
        Racer.fromRacer(racer),
      ])
    );

    game.map = state.map as unknown as Map;
  }

  racers: Record<string, Racer>;
  map: Map;
  isGameOver = false;

  start() {
    values(this.racers).forEach((racer) => {
      racer.position = Vector.fromArray(this.map.start.positions[0]);
      racer.vector = Vector.fromArray(this.map.start.positions[0]);
      racer.facing = Vector.fromArray(this.map.start.direction);
      racer.laps = 0;

      racer.deck = shuffle(racer.deck);
      for (let i = 0; i < racer.handSize; i++) {
        racer.draw();
      }
    });
  }

  resolveActions(moves: Action[]) {
    moves.forEach((move) => this.resolveAction(move));
  }

  resolveAction(move: Action) {
    const racer = this.racers[move.racerId];
    const newRacer = this.resolvePlayerMove(move, racer);

    this.racers[racer.id] = newRacer;
    // possibleVectors: VectorService.createPossibleVectors(newRacer)
  }

  resolvePlayerMove(move: Action, racer: Racer): Racer {
    const prevPosition = racer.position;
    racer.moves.push(prevPosition.clone());
    racer.position = move.cursor.clone();

    const velocity = getVelocity(prevPosition, move.cursor);
    racer.vector = move.cursor.clone().add(velocity);

    // check for collisions
    const paths = this.map.paths;
    const hasCrashed = paths.some((path) => {
      for (let i = 0; i < path.length - 1; i++) {
        const prev = path[i];
        const curr = path[i + 1];
        if (
          doIntersect(
            Vector.fromArray(prev),
            Vector.fromArray(curr),
            prevPosition.clone(),
            racer.position.clone()
          )
        ) {
          return true;
        }
      }
    });

    // return the racer to their last position and set vector the same
    if (hasCrashed) {
      racer.position = prevPosition.clone();
      racer.vector = prevPosition.clone();
    }

    /**
     * Crossing the start line prevPos -> pos
     *
     * Ignore the move if the player lands on the start line
     * If they move over or off the start line check the direction of travel against the direction of the start line
     * if we are moving in the direction of the race +1 to laps
     * if we are moving in the opposite direction -1 to laps
     *
     */
    const startLine = this.map.start.line;

    const isOnStartLineLine = (vec: Vector) => {
      const result =
        Math.abs(
          angleOfVectorsRadians(
            vec.clone().subtract(Vector.fromArray(startLine[0])).normalize(),
            vec.clone().subtract(Vector.fromArray(startLine[1])).normalize()
          )
        ) === Math.PI;
      return result;
    };

    const crossedFinishLine = doIntersect(
      Vector.fromArray(startLine[0]),
      Vector.fromArray(startLine[1]),
      prevPosition.clone(),
      racer.position.clone()
    );
    // console.log('crossedFinishLine', crossedFinishLine);

    if (crossedFinishLine) {
      if (!isOnStartLineLine(prevPosition)) {
        if (isOnStartLineLine(racer.position)) {
          const angleToExpectedTravel = angleOfVectorsRadians(
            velocity.normalize(),
            Vector.fromArray(this.map.start.direction).normalize()
          );
          // console.log('cross:', angleToExpectedTravel);
          if (Math.abs(angleToExpectedTravel) < Math.PI / 2) {
            // console.log('crossed forward');
            racer.laps++;
          } else if (Math.abs(angleToExpectedTravel) > Math.PI / 2) {
            // console.log('crossed backward');
            racer.laps--;
          }
        }
      }
    }

    move.cards?.forEach(([deckId]) => racer.playCard(deckId));

    for (let i = racer.hand.length; i < racer.handSize; i++) {
      racer.draw();
    }

    return racer;
  }

  public toGameState(): GameStateDto {
    return {
      racers: Object.fromEntries(
        Object.entries(this.racers).map(([id, racer]) => [id, racer.toRacer()])
      ),
      map: this.map,
      isGameOver: this.isGameOver
    };
  }
}
