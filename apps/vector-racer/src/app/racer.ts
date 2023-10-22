import Vector from 'victor';

export interface Racer {
  id: string;
  name: string;
  moves: [number, number][];
  position: Vector;
  vector: Vector;
  possibleVectors?: [Vector, Vector][];
  laps:number;
}

