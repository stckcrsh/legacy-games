import { RacerDto } from '../types';

export interface Card {
  name: string;
  id: string;
  description: string;
  ethereal: boolean;
  execute: (player: RacerDto) => RacerDto;
}
