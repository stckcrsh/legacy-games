
export interface CreateGameRuntimeDto {
  things: string;
}

export interface GameState {
  racers: Record<string, Racer>;
  map: {
    paths: Array<Array<[number, number]>>;
    start: {
      line: Array<[number, number]>;
      direction: [number, number];
    };
  };
}

export interface NPCRacer {
  id: string;
  name: string;
  moves: [number, number][];
  position: [number, number];
  vector: [number, number];
  laps: number;
}

export interface Racer {
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
  deck: any[];
  hand: [string, string][];
}

export interface PotentialMove {
  racerId: string;
  cursor: [number, number];
  cards?: any[];
}
