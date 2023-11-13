import { Card } from './card';

const SCALE_UNIT = 0.5;

export const cards: Card[] = [
  {
    name: 'Accelerate',
    id: 'accelerate',
    description: 'increase forward +1',
    ethereal: false,
    execute: (player) => {
      // this should increase forward scale by 1 unit
      return {
        ...player,
        forwardSteps: player.forwardSteps + 1,
      };
    },
  },
  {
    name: 'Turn',
    id: 'turn',
    description: 'Turn +1',
    ethereal: false,
    execute: (player) => {
      // this should increase lateral scale by 1 unit
      return {
        ...player,
        lateralSteps: player.lateralSteps + 1,
      };
    },
  },
  {
    name: 'Brake',
    id: 'brake',
    description: 'Brake +1',
    ethereal: false,
    execute: (player) => {
      // this should increase backward scale by 1 unit
      return {
        ...player,
        backwardSteps: player.backwardSteps + 1,
      };
    },
  },
  {
    name: 'Cooldown',
    id: 'cooldown',
    description: 'Cooldown +1',
    ethereal: false,
    execute: (player) => {
      // this should increase backward scale by 1 unit
      return {
        ...player,
      };
    },
  },
];
