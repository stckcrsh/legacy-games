import Vector from 'victor';

import { Stack } from '@vector-racer/lib';

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
  deck?: Stack<[string, string]>;
  hand?: Stack<[string, string]>;
}

export interface Action {
  racerId: string;
  cursor: Vector;
  cards?: Stack<[string, string]>;
}
