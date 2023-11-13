// Part slots
//  - Engine: V6/standard cards: 1 Cooldown, 1 Accelerate
//  - Front wheels: */standard cards: 2 Turn
//  - Back wheels: */standard cards: 1 Accelerate, 1 Turn
//  - Brake: 2 Brake
//  - Accesory: Suspension/standard cards: 1 Turn
//  - Accessory: Empty by default

import { Part } from './part';

export default [
  {
    id: 'v6',
    name: 'V6 Engine',
    description: 'V6 Engine',
    manufacturer: 'Standard',
    lateralScaleModifier: 0,
    forwardScaleModifier: 0,
    backwardScaleModifier: 0,
    weight: 0,
    heatPool: 6,
    cards: ['cooldown', 'accelerate'],
    slots: ['engine'],
  },
  {
    id: 'radial',
    name: 'Radial Wheels',
    description: 'Radial Wheels',
    manufacturer: 'standard',
    lateralScaleModifier: .1,
    forwardScaleModifier: 0,
    backwardScaleModifier: 0,
    weight: 0,
    heatPool: 0,
    cards: ['turn', 'turn'],
    slots: ['wheel'],
  },
  {
    id: 'lock-tite',
    name: 'Lock-Tite Brakes',
    description: 'Lock-Tite Brakes',
    manufacturer: 'standard',
    lateralScaleModifier: 0,
    forwardScaleModifier: 0,
    backwardScaleModifier: .1,
    weight: 0,
    heatPool: 0,
    cards: ['brake', 'brake'],
    slots: ['brake'],
  },
  {
    id: 'suspension',
    name: 'Suspension',
    description: 'Suspension',
    manufacturer: 'standard',
    lateralScaleModifier: .1,
    forwardScaleModifier: 0,
    backwardScaleModifier: 0,
    weight: 0,
    heatPool: 0,
    cards: ['turn'],
    slots: ['accessory'],
  },
  {
    id: 'slicks',
    name: 'Slicks',
    description: 'Slicks',
    manufacturer: 'Speed Demons',
    lateralScaleModifier: -0.1,
    forwardScaleModifier: .1,
    backwardScaleModifier: 0,
    weight: 0,
    heatPool: 0,
    cards: ['accelerate', 'turn'],
    slots: ['wheel'],
  },
  {
    id: 'v8',
    name: 'V8 Engine',
    description: 'V8 Engine',
    manufacturer: 'Speed Demons',
    lateralScaleModifier: 0,
    forwardScaleModifier: 0,
    backwardScaleModifier: 0,
    weight: 0,
    heatPool: 8,
    cards: ['cooldown', 'accelerate', 'accelerate'],
    slots: ['engine'],
  },
  {
    id: 'drum',
    name: 'Drum Brakes',
    description: 'Drum Brakes',
    manufacturer: 'Speed Demons',
    lateralScaleModifier: 0,
    forwardScaleModifier: 0,
    backwardScaleModifier: .2,
    weight: 0,
    heatPool: 0,
    cards: ['brake', 'brake', 'brake'],
    slots: ['brake'],
  }

] as Part[];



