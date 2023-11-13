import { Card } from './card';
import { cards } from './cards';

export const cardLookup = cards.reduce(
  (acc, card) => {
    acc[card.id] = card;
    return acc;
  },
  {} as Record<string, Card>
);

export * from './card';
