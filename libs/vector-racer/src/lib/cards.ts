import { Racer } from './types';

const SCALE_UNIT = 0.5;

export interface Card {
  name: string;
  id: string;
  description: string;
  execute: (player: Racer) => Racer;
}

export const lateralPlus = {
  name: 'Lateral Plus',
  id: 'lateral-plus',
  description: 'increase lateral +1',
  execute: (player: Racer) => {
    // this should increase lateral scale by 1 unit
    return {
      ...player,
      lateralScale: player.lateralScale + SCALE_UNIT,
    };
  },
};

export const accelerate = {
  name: 'Accelerate',
  id: 'accelerate',
  description: 'increase forward +1',
  execute: (player: Racer) => {
    // this should increase forward scale by 1 unit
    return {
      ...player,
      forwardScale: player.forwardScale + SCALE_UNIT,
    };
  },
};


export const betterWheels = {
  name: 'Better Wheels',
  id: 'better-wheels',
  description: 'increase lateral steps',
  execute: (player: Racer) => {
    // this should increase lateral scale by 1 unit
    return {
      ...player,
      lateralSteps: player.lateralSteps + 1,
    };
  },
};

export const cardLookup = [lateralPlus, accelerate, betterWheels].reduce((acc, card) => {
  acc[card.id] = card;
  return acc;
}, {} as Record<string, Card>);
