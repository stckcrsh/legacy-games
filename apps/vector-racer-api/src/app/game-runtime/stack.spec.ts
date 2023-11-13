import Prando from 'prando';

import { shuffle } from './stack';

const SEED = 5673283290387482;

describe('Stack Utilities', () => {
  describe('Shuffle', () => {
    it('should handle 0 size stacks', () => {
      const deck = [];

      const shuffled = shuffle(deck);

      expect(shuffled).toHaveLength(0);
    });

    it('should handle 1 length stacks', () => {
      const deck = [1];
      const shuffled = shuffle(deck);

      expect(shuffled).toEqual([1]);
    });
    it('should handle bigger stacks', () => {
      const decks = [
        [1, 2, 3, 4],
        [1, 2, 3, 4, 5, 6, 7, 8],
      ];

      expect(decks.map((deck) => shuffle(deck, new Prando(SEED)).toString()))
        .toMatchInlineSnapshot(`
        [
          "4,2,1,3",
          "8,3,2,6,7,4,5,1",
        ]
      `);
    });
  });
});
