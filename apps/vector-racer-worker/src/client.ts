import crypto from 'node:crypto';

import { Client } from '@temporalio/client';

import { scaleMap } from './map.utils';
import { playerLoadout, playerMove, VectorGame } from './workflows';

async function run() {
  const client = new Client();

  const handle = await client.workflow.start(VectorGame, {
    args: [
      [{ userId: 'john' }],
      {
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
        baseCards: [],
      },
      scaleMap({
        name: 'basic',
        paths: [
          [
            [18, 0],
            [20, 0.25],
            [23, 1.5],
            [25, 3.85],
            [28, 6],
            [31, 7],
            [35, 7],
            [35, 17],
            [30, 22],
            [1, 22],
            [1, 17],
            [6, 12.5],
            [1, 9],
            [1, 1],
            [7, 1],
            [8, 0],
            [18, 0],
          ],
          [
            [18, 3],
            [20, 4],
            [22, 6],
            [25, 8],
            [28, 9.5],
            [31, 10],
            [31, 16],
            [29, 18],
            [5, 18],
            [10, 14],
            [10, 12],
            [4, 7],
            [4, 4],
            [5, 4],
            [7, 3],
            [18, 3],
          ],
        ],
        start: {
          line: [
            [15, 0],
            [15, 3],
          ],
          direction: [1, 0],
          positions: [[15, 1.5]],
        },
      },1.65)
    ],
    taskQueue: 'vector-racer',
    workflowId: 'workflow-' + crypto.randomUUID(),
  });
  console.log(`Started workflow ${handle.workflowId}`);

  //wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  await handle.signal(playerLoadout, {
    userId: 'john',
    parts: [
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
    ],
  });
  //wait for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));

  await handle.signal(playerMove, {
    racerId: 'john',
    cursor: [26.75, 2],
    cards: [],
  });
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
