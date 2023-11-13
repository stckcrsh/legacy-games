type PartId = string;
export interface GameStateDto {
  isGameOver: boolean;
  racers: Record<string, RacerDto>;
  map: {
    paths: Array<Array<[number, number]>>;
    start: {
      line: Array<[number, number]>;
      direction: [number, number];
    };
  };
}

export interface NPCRacerDto {
  id: string;
  name: string;
  moves: [number, number][];
  position: [number, number];
  vector: [number, number];
  laps: number;
}

export interface RacerDto {
  id: string;
  name: string;
  moves: [number, number][];
  position: [number, number];
  vector: [number, number];
  possibleVectors?: [number, number][];
  laps: number;
  lateralScale: number;
  forwardScale: number;
  backwardScale: number;
  lateralSteps: number;
  forwardSteps: number;
  backwardSteps: number;
  deck: DeckDto;
  hand: DeckDto;
  discard: DeckDto;
}

export interface RacerActionDto {
  racerId: string;
  cursor: [number, number];
  cards?: DeckDto;
}

export type CardDto = [string, string];

export type Stack<T> = Array<T>;
export type DeckDto = Stack<CardDto>;
type InventoryId = string;
export type InventoryItem = [InventoryId, PartId];

export type InventoryDto = InventoryItem[];
