import Vector from 'victor';

import { Injectable } from '@nestjs/common';
import { angleOfVectorsRadians, rotateVector2d } from '@vector-racer/lib';

import { Racer } from './models';

// everything should be based on forward pointing up (0,-1)
// all the letters refer to a direction relative to the forward vector
// f = forward
// b = backward
// l = left
// r = right
// this way moving diagonal is just a combination of two letters
export const VECTOR_GRID: Array<[Vector, string]> = [
  [new Vector(0, 1), 'b'],
  [new Vector(0, -1), 'f'],
  [new Vector(1, 0), 'r'],
  [new Vector(-1, 0), 'l'],
  [new Vector(1, 1), 'rb'],
  [new Vector(1, -1), 'rf'],
  [new Vector(-1, 1), 'lb'],
  [new Vector(-1, -1), 'lf'],
];

/**
 * This service is responsible for managing a racers vector and positions
 * this will be used to notify racers of their possible moves based on their vector
 */
@Injectable()
export class VectorService {
  // This takes a racers velocity and returns a list of all possible vectors
  /**
   * All possible vectors for a racer include
   * the 9 base vectors
   * extra lateral vectors
   * extra forward vectors
   * extra backward vectors
   *
   * extra drift vectors
   * @param racer
   * @returns
   */
  static createPossibleVectors(racer: Racer): [Vector, Vector][] {
    const { forwardScale, lateralScale, backwardScale } = racer;

    // if velocity is 0 then we dont know direction and cant do much from it.
    // TODO: do something different when velocity is 0

    const racerDirection = angleOfVectorsRadians(
      // forward is up
      new Vector(0, -1),
      racer.vector.clone().subtract(racer.position).normalize()
    );

    return VECTOR_GRID.map(([vector, dir]) => {
      let neighbor: Vector;

      neighbor = vector.clone();
      if (vector.y < 0) {
        neighbor.multiplyScalarY(forwardScale);
      }

      if (vector.x > 0 || vector.y < 0) {
        neighbor.multiplyScalarY(lateralScale);
      }

      if (vector.y > 0) {
        neighbor.multiplyScalarY(backwardScale);
      }

      if (
        racer.position.x !== racer.vector.x ||
        racer.position.y !== racer.vector.y
      ) {
        neighbor = rotateVector2d(neighbor, racerDirection).add(racer.vector);
      } else {
        neighbor = racer.vector.clone().add(neighbor);
      }

      return [
        vector,
        new Vector(
          Number(neighbor.x.toFixed(2)),
          Number(neighbor.y.toFixed(2))
        ),
      ];
    });
  }
}
