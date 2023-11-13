import {
    condition, defineQuery, defineSignal, proxyActivities, setHandler
} from '@temporalio/workflow';
import { Chassis, Part } from '@vector-racer/lib';

import * as activities from '../activities';

type SlotName = string;
type PartId = string;

interface InputProps {
  chassis: Chassis;
}

const { loadPart } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export const submitSignal = defineSignal('submit');
export const setSignal =
  defineSignal<[{ chassis: Chassis; parts: [SlotName, PartId][] }]>('set');

export const stateQuery = defineQuery('state');

enum Thing {
  Loading,
  Valid,
  Invalid,
  Initialized,
}

interface State {
  chassis: Chassis;
  loadout: [SlotName, Part][];
  state: Thing;
  errors?: string[];
  submitted: boolean;
}

/**
 * This is in charge of waiting for the user to enter in their loadout
 * After it is recieved then its hydrated from data and validated
 *
 * After its final submission then it completes and returns the validated and
 * hydrated complete loadout
 *
 * @param props
 * @returns
 */
export const GenericLoadoutWorkflow = async (props: InputProps) => {
  const state: State = {
    chassis: props.chassis,
    loadout: [],
    state: Thing.Initialized,
    submitted: false
  };

  setHandler(stateQuery, () => state);

  setHandler(setSignal, async ({ chassis, parts }) => {
    state.state = Thing.Loading;

    state.chassis = chassis;

    // load all the parts from the part loading activity
    const loadout = await Promise.all(
      parts.map(([slotName, partId]) => {
        return loadPart(partId).then<[SlotName, Part]>((part) => [slotName, part]);
      })
    );

    state.loadout = loadout;
    state.state = Thing.Valid;
  });

  setHandler(submitSignal, () => {
    if(state.state === Thing.Valid){
      state.submitted = true;
    }
  })

  await condition(() => state.submitted )
  return state.loadout;
};
