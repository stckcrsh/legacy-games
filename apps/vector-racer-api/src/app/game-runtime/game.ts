import Victor from 'victor';
import { PotentialMove, Racer } from './models';
import {
  angleOfVectorsRadians,
  doIntersect,
  getVelocity,
} from '@vector-racer/lib';
import { VectorService } from './vector.service';
import { Map } from './map.utils';

interface GameState {
  racers: Record<string, Racer>;
  map: Map;
}

/**
 * TODO: need to validate input vector
 */
export class Game {
  static fromGameState(state: GameState) {
    return new Game(state);
  }

  racers: Record<string, Racer>;
  map: Map;

  constructor(_state: GameState) {
    this.racers = _state.racers;
  }

  resolveMove(move: PotentialMove): GameState {
    const racer = this.racers[move.racerId];
    const newRacer = this.resolvePlayerMove(move, racer);

    this.racers = {
      ...this.racers,
      [racer.id]: {
        ...newRacer,
        possibleVectors: VectorService.createPossibleVectors(newRacer),
      },
    };

    return {
      racers: this.racers,
      map: this.map,
    };
  }

  resolvePlayerMove(move: PotentialMove, racer: Racer): Racer {
    const prevPosition = racer.position;
    racer.moves.push([prevPosition.x, prevPosition.y]);
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
            Victor.fromArray(prev),
            Victor.fromArray(curr),
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

    const isOnStartLineLine = (vec: Victor) => {
      const result =
        Math.abs(
          angleOfVectorsRadians(
            vec.clone().subtract(Victor.fromArray(startLine[0])).normalize(),
            vec.clone().subtract(Victor.fromArray(startLine[1])).normalize()
          )
        ) === Math.PI;
      return result;
    };

    const crossedFinishLine = doIntersect(
      Victor.fromArray(startLine[0]),
      Victor.fromArray(startLine[1]),
      prevPosition.clone(),
      racer.position.clone()
    );
    console.log('crossedFinishLine', crossedFinishLine);

    if (crossedFinishLine) {
      if (!isOnStartLineLine(prevPosition)) {
        if (isOnStartLineLine(racer.position)) {
          const angleToExpectedTravel = angleOfVectorsRadians(
            velocity.normalize(),
            Victor.fromArray(this.map.start.direction).normalize()
          );
          console.log('cross:', angleToExpectedTravel);
          if (Math.abs(angleToExpectedTravel) < Math.PI / 2) {
            console.log('crossed forward');
            racer.laps++;
          } else if (Math.abs(angleToExpectedTravel) > Math.PI / 2) {
            console.log('crossed backward');
            racer.laps--;
          }
        }
      }
    }

    return {
      ...racer,
      possibleVectors: VectorService.createPossibleVectors(racer),
    };
  }
}
