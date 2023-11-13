type PartId = string;
type SlotName = string;
type SlotTypes = string[];

export interface Chassis {
  handSize: number;
  baseWeight: number;

  baseLateralScale: number;
  baseForwardScale: number;
  baseBackwardScale: number;

  baseCards: string[];

  slots: Array<[SlotName, SlotTypes]>;
  defaults: Record<SlotName, PartId>;
}
