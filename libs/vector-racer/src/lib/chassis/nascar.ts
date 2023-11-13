// Max Heat: 4
// Hand Size: 3

import { Chassis } from './chassis';

// Part slots
//  - Engine: V6/standard cards: 1 Cooldown, 1 Accelerate
//  - Front wheels: */standard cards: 2 Turn
//  - Back wheels: */standard cards: 1 Accelerate, 1 Turn
//  - Brake: 2 Brake
//  - Accesory: Suspension/standard cards: 1 Turn
//  - Accessory: Empty by default

// Base stats
//   - acceleration: MED
//   - lateral: MED
//   - brake: MED

// Weight: 150

// Base deck - 9 cards

export const nascar: Chassis = {
  baseForwardScale: 1.1,
  baseBackwardScale: 1.1,
  baseLateralScale: 1.1,

  baseWeight: 150,
  handSize: 3,
  slots: [
    ['engine', ['engine']],
    ['front-wheels', ['wheel']],
    ['back-wheels', ['wheel']],
    ['brake', ['brake']],
    ['accessory1', ['accessory']],
    ['accessory2', ['accessory']],
  ],
  defaults: {
    engine: 'v6',
    'front-wheels': 'radial',
    'back-wheels': 'radial',
    brake: 'lock-tite',
    accessory1: 'suspension',
  },
  baseCards:[]
};
