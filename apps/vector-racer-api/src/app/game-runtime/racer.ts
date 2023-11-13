import { isNull } from 'lodash';
import { v4 } from 'uuid';
import Vector from 'victor';

import { Chassis, Part, partLookup, RacerDto, Stack } from '@vector-racer/lib';

import { shuffle } from './stack';

export class Racer {
  static newRacer(
    chassis: Chassis,
    parts: Record<string, Part>,
    racerId: string,
    name: string
  ) {

    // grab all the parts that are in the chassis and the default parts
    const resolvedParts = chassis.slots.map(([slotName]) => {
      const part = parts[slotName];
      if (part) {
        return part;
      }
      const defaultPartId = chassis.defaults[slotName];
      if (defaultPartId) {
        return partLookup(defaultPartId);
      }
      return null;
    })
    .filter((part) => !isNull(part));


    const deck = resolvedParts
      .flatMap((part) => part.cards)
      .map((cardId) => [v4(), cardId] as [string, string]);

    const racer = new Racer();
    racer.id = racerId;
    racer.name = name;
    racer.deck = deck;
    racer.lateralScale = resolvedParts.reduce(
      (acc, part) => acc + part.lateralScaleModifier,
      chassis.baseLateralScale
    );
    racer.backwardScale = resolvedParts.reduce(
      (acc, part) => acc + part.backwardScaleModifier,
      chassis.baseBackwardScale
    );
    racer.forwardScale = resolvedParts.reduce(
      (acc, part) => acc + part.forwardScaleModifier,
      chassis.baseForwardScale
    );
    racer.backwardSteps = 1;
    racer.forwardSteps = 1;
    racer.lateralSteps = 1;
    racer.weight = chassis.baseWeight;
    racer.moves = [];
    racer.handSize = chassis.handSize;
    racer.hand = [];
    racer.heatPool = resolvedParts.reduce((acc, part) => acc + part.heatPool, 0);
    return racer;
  }

  static fromRacer(racer: RacerDto) {
    const newRacer = new Racer();
    newRacer.id = racer.id;
    newRacer.name = racer.name;
    newRacer.moves = racer.moves.map((move) => Vector.fromArray(move));
    newRacer.position = Vector.fromArray(racer.position);
    newRacer.vector = Vector.fromArray(racer.vector);
    newRacer.laps = racer.laps;
    newRacer.lateralScale = racer.lateralScale;
    newRacer.forwardScale = racer.forwardScale;
    newRacer.backwardScale = racer.backwardScale;
    newRacer.lateralSteps = racer.lateralSteps || 1;
    newRacer.forwardSteps = racer.forwardSteps || 1;
    newRacer.backwardSteps = racer.backwardSteps || 1;
    newRacer.deck = racer.deck;
    newRacer.hand = racer.hand;
    return newRacer;
  }

  id: string;
  name: string;
  moves?: Vector[] = [];
  position: Vector;
  vector: Vector;
  facing: Vector;
  laps: number;
  lateralScale: number;
  forwardScale: number;
  backwardScale: number;
  lateralSteps?: number;
  forwardSteps?: number;
  backwardSteps?: number;
  weight: number;
  deck: Stack<[string, string]>;
  discard: Stack<[string, string]> = [];
  hand: Stack<[string, string]> = [];
  handSize: number;
  heatPool: number;
  heat?: number = 0;

  draw() {
    const card = this.deck.pop();

    if (card) {
      this.hand.push(card);
    } else {
      if (this.discard.length > 0) {
        this.reshuffle();
        this.draw();
      }
    }
  }

  reshuffle() {
    this.deck = shuffle(this.discard);
    this.discard = [];
  }


  playCard(deckId: string){
    const card = this.hand.find((card) => card[0] === deckId);
    if (!card) {
      throw new Error('Card not found');
    }
    this.discard.push(card);
    this.hand = this.hand.filter((card) => card[0] !== deckId);
  }

  toRacer(): RacerDto {
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
      discard: this.discard,
    };
  }
}
