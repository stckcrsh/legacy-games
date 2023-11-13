import { isNil } from 'lodash';
import { createSelector } from 'reselect';
import { from, map, merge, Observable, scan, shareReplay, Subject } from 'rxjs';

import { Chassis, InventoryDto, Part, partLookup } from '@vector-racer/lib';

import gameService from '../game.service';

type Maybe<T> = NonNullable<T> | undefined;

type SlotName = string;
type InventoryId = string;

export interface EquipState {
  chassis: Chassis;
  inventoryEntities: Record<InventoryId, { id: string; part: Part }>;

  slots: Record<
    SlotName,
    {
      inventoryId: Maybe<InventoryId>;
      types: string[];
    }
  >;
  inventory: Record<InventoryId, boolean>;
}
type InitAction = { type: 'init'; payload: InventoryDto };
type SelectAction = {
  type: 'select';
  payload: { slotName: string; inventoryId: Maybe<InventoryId> };
};
type Actions = InitAction | SelectAction;

// The equip component takes in a chassis and determines what parts are available to equip.
export class EquipBloc {
  public selectedPart$ = new Subject<{
    slotName: string;
    inventoryId: Maybe<InventoryId>;
  }>();

  private _state$: Observable<EquipState>;

  constructor(chassis: Chassis) {
    const commands$: Observable<Actions> = merge(
      this.getInventory().pipe(
        map<InventoryDto, InitAction>((inventory) => ({
          type: 'init',
          payload: inventory,
        }))
      ),
      this.selectedPart$.pipe(
        map(
          ({ slotName, inventoryId }): SelectAction => ({
            type: 'select',
            payload: { slotName, inventoryId },
          })
        )
      )
    );

    this._state$ = commands$.pipe(
      scan(
        (state, action) => {
          switch (action.type) {
            case 'init':
              return {
                ...state,
                inventoryEntities: action.payload.reduce(
                  (acc, [inventoryId, partId]) => {
                    acc[inventoryId] = {
                      id: inventoryId,
                      part: partLookup(partId),
                    };
                    return acc;
                  },
                  {} as Record<InventoryId, { id: string; part: Part }>
                ),
                inventory: action.payload.reduce((acc, [inventoryId]) => {
                  acc[inventoryId] = false;
                  return acc;
                }, {} as Record<InventoryId, boolean>),
              } as EquipState;
            case 'select': {
              console.log({ action });
              const { slotName, inventoryId } = action.payload;
              const { slots, inventory } = state;

              const equippedInventoryId = slots[slotName].inventoryId;
              if (!isNil(equippedInventoryId)) {
                inventory[equippedInventoryId] = false;
              }

              slots[slotName].inventoryId = inventoryId;

              if (inventoryId) {
                inventory[inventoryId] = true;
              }

              return {
                ...state,
                inventory: { ...inventory },
                slots: { ...slots },
              } as EquipState;
            }
            default:
              return state;
          }
        },
        {
          chassis,
          slots: chassis.slots.reduce(
            (acc, [slotName, slotTypes]) => {
              acc[slotName] = {
                inventoryId: null,
                types: slotTypes,
              };
              return acc;
            },
            {} as Record<
              SlotName,
              {
                inventoryId: InventoryId | null;
                types: string[];
              }
            >
          ),
          inventory: {},
        } as EquipState
      ),
      shareReplay(1)
    );
  }

  get state$() {
    return this._state$;
  }

  getInventory(): Observable<InventoryDto> {
    return from(gameService.getInventory());
  }
}

export const getInventoryEntities = (state: EquipState) =>
  state.inventoryEntities;
export const getSlots = (state: EquipState) => state.slots;
export const getChassis = (state: EquipState) => state.chassis;
export const getDefaultParts = createSelector(
  getChassis,
  (chassis: Chassis) => chassis.defaults
);

export const getDefaultPart = (slotName: string) =>
  createSelector(getDefaultParts, (defaults) => defaults[slotName]);

export const equippedParts = createSelector(
  getInventoryEntities,
  getSlots,
  getDefaultParts,
  (inventoryEntities, slots, defaults) => {
    return Object.entries(slots).reduce((acc, [slotName, { inventoryId }]) => {
      if (inventoryId) {
        acc.push(inventoryEntities[inventoryId].part);
      } else {
        if (defaults[slotName]) {
          acc.push(partLookup(defaults[slotName]));
        }
      }
      return acc;
    }, [] as Part[]);
  }
);
