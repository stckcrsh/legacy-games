import Vector from 'victor';

export interface CreateGameRuntimeDto {
  things: string;
}

export interface Racer {
  id: string;
  name: string;
  moves: [number, number][];
  position: Vector;
  vector: Vector;
  possibleVectors?: [Vector, Vector][];
  laps: number;
  lateralScale?: number;
  forwardScale?: number;
  backwardScale?: number;
  deck?: any[];
  hand?: any[];
}

export interface PotentialMove {
  racerId: string;
  cursor: Vector;
  cards?: any[];
}
