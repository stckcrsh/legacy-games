export interface Part {
  id: string;
  name: string;
  description?: string;
  manufacturer?: string;
  weight: number;
  cards: string[];
  lateralScaleModifier: number;
  forwardScaleModifier: number;
  backwardScaleModifier: number;
  heatPool: number;
  slots: string[];
}
