import Prando from 'prando';

import { Stack } from '@vector-racer/lib';

export const shuffle = <T>(stack: Stack<T>, rng: Prando = new Prando): Stack<T> => {

  const oldStack = [...stack];
  const newStack = [];

  // quick random algorithm
  while (oldStack.length > 0) {
    const plucked = oldStack.splice(
      Math.floor(rng.nextInt(0, oldStack.length-1)),
      1
    );
    newStack.push(plucked[0]);
  }

  return newStack;
};


