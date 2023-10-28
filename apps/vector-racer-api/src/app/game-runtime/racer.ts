import Vector from 'victor';

import { Racer as RacerModel } from '@vector-racer/lib';

export class Racer{
  static fromRacer(racer: RacerModel) {
    return new Racer(racer);
  }

    id: string;
    name: string;
    moves: Vector[];
    position: Vector;
    vector: Vector;
    laps: number;
    lateralScale?: number;
    forwardScale?: number;
    backwardScale?: number;
    lateralSteps?: number;
    forwardSteps?: number;
    backwardSteps?: number;
    deck?: any[];
    hand?: any[];


  constructor(racer:RacerModel) {
    this.id = racer.id;
    this.name = racer.name;
    this.moves = racer.moves.map((move) => Vector.fromArray(move));
    this.position = Vector.fromArray(racer.position);
    this.vector = Vector.fromArray(racer.vector);
    this.laps = racer.laps;
    this.lateralScale = racer.lateralScale;
    this.forwardScale = racer.forwardScale;
    this.backwardScale = racer.backwardScale;
    this.lateralSteps = racer.lateralSteps || 1;
    this.forwardSteps = racer.forwardSteps || 1;
    this.backwardSteps = racer.backwardSteps || 1;
    this.deck = racer.deck;
    this.hand = racer.hand;
  }

  toRacer(): RacerModel {
    return {
      id: this.id,
      name: this.name,
      moves: this.moves.map((move) => move.toArray() as [number, number]),
      position: this.position.toArray() as [number, number],
      vector: this.vector.toArray() as [number, number],
      laps: this.laps,
      lateralScale: this.lateralScale,
      forwardScale: this.forwardScale,
      backwardScale: this.backwardScale,
      lateralSteps: this.lateralSteps,
      forwardSteps: this.forwardSteps,
      backwardSteps: this.backwardSteps,
      deck: this.deck,
      hand: this.hand,
    };
  }
}
