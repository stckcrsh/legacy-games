import Vector from 'victor';

import { Racer } from './types';
import {
  VECTOR_GRID,
  angleOfVectorsRadians,
  rotateVector2d,
} from './vector.utils';
import { Card } from './cards';

/**
 *
 * @param racer
 * @returns array of tuples [gridVector, possibleVector]
 */
export function createPossibleVectors(
  _racer: Racer,
  cards: Card[]
): [Vector, Vector][] {
  const racer = cards.reduce((acc, card) => card.execute(acc), _racer);
  console.log(racer);

  const { forwardScale, lateralScale, backwardScale } = racer;

  const vector = Vector.fromArray(racer.vector);
  const position = Vector.fromArray(racer.position);

  // if velocity is 0 then we dont know direction and cant do much from it.
  // TODO: do something different when velocity is 0

  const racerDirection = angleOfVectorsRadians(
    // forward is up
    new Vector(0, -1),
    vector.clone().subtract(position).normalize()
  );

  return VECTOR_GRID.filter(([_, dir, step]) => {
    let result = false;
    // lateral vector filtering
    if (dir.includes('l') && step <= racer.lateralSteps) {
      result = true;
    }

    if (dir.includes('f') && step <= racer.forwardSteps) {
      result = true;
    }

    if (dir.includes('b') && step <= racer.backwardSteps) {
      result = true;
    }

    return result;
  }).map(([_vector]) => {
    let neighbor: Vector;

    neighbor = _vector.clone();
    if (_vector.y < 0) {
      neighbor.multiplyScalarY(forwardScale);
    }

    if (_vector.x > 0 || _vector.x < 0) {
      neighbor.multiplyScalarX(lateralScale);
    }

    if (_vector.y > 0) {
      neighbor.multiplyScalarY(backwardScale);
    }

    if (position.x !== vector.x || position.y !== vector.y) {
      neighbor = rotateVector2d(neighbor, racerDirection).add(vector);
    } else {
      neighbor = vector.clone().add(neighbor);
    }

    return [
      _vector,
      new Vector(Number(neighbor.x.toFixed(2)), Number(neighbor.y.toFixed(2))),
    ];
  });
}
