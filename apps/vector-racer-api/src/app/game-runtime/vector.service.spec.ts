import Vector from 'victor';

import { Racer } from './models';
import { VectorService } from './vector.service';

const baseRacer: Racer = {
  id: '1',
  name: 'test',
  moves: [],
  position: new Vector(0, 0),
  vector: new Vector(0, 0),
  laps: 0,
  lateralScale: 1,
  forwardScale: 1,
  backwardScale: 1,
};

describe('VectorService', () => {
  describe('given there is no velocity', () => {
    it('should generate a base grid at the vector', () => {
      const racer = {
        ...baseRacer,
        position: new Vector(12, 6),
        vector: new Vector(12, 6),
      }
      // VectorService.createPossibleVectors(racer).forEach(([vector, neighbor]) => {
      //   expect(vector.x).toEqual(neighbor.x);
      //   expect(vector.y).toEqual(neighbor.y);
      // });
      expect(VectorService.createPossibleVectors(racer)).toMatchInlineSnapshot(`
        [
          [
            Victor {
              "x": 0,
              "y": 1,
            },
            Victor {
              "x": 12,
              "y": 7,
            },
          ],
          [
            Victor {
              "x": 0,
              "y": -1,
            },
            Victor {
              "x": 12,
              "y": 5,
            },
          ],
          [
            Victor {
              "x": 1,
              "y": 0,
            },
            Victor {
              "x": 13,
              "y": 6,
            },
          ],
          [
            Victor {
              "x": -1,
              "y": 0,
            },
            Victor {
              "x": 11,
              "y": 6,
            },
          ],
          [
            Victor {
              "x": 1,
              "y": 1,
            },
            Victor {
              "x": 13,
              "y": 7,
            },
          ],
          [
            Victor {
              "x": 1,
              "y": -1,
            },
            Victor {
              "x": 13,
              "y": 5,
            },
          ],
          [
            Victor {
              "x": -1,
              "y": 1,
            },
            Victor {
              "x": 11,
              "y": 7,
            },
          ],
          [
            Victor {
              "x": -1,
              "y": -1,
            },
            Victor {
              "x": 11,
              "y": 5,
            },
          ],
        ]
      `);
    });
  });
  describe('given there is a velocity', () => {
    /**
     *  _|_|_|_|_|
     *  _|_|/|_|_|
     *  _|0|_|_|_|
     *  _|_|_|_|_|
     *
     * 0 = racer
     * / = direction of the vector
     *
     */
    it('should rotate the grid based on the velocity', () => {
      const racer: Racer = {
        ...baseRacer,
        position: new Vector(-1, 1),
        vector: new Vector(0, 0),
      };
      const grid = VectorService.createPossibleVectors(racer);

      expect(grid).toMatchInlineSnapshot(`
        [
          [
            Victor {
              "x": 0,
              "y": 1,
            },
            Victor {
              "x": -0.71,
              "y": 0.71,
            },
          ],
          [
            Victor {
              "x": 0,
              "y": -1,
            },
            Victor {
              "x": 0.71,
              "y": -0.71,
            },
          ],
          [
            Victor {
              "x": 1,
              "y": 0,
            },
            Victor {
              "x": 0.71,
              "y": 0.71,
            },
          ],
          [
            Victor {
              "x": -1,
              "y": 0,
            },
            Victor {
              "x": -0.71,
              "y": -0.71,
            },
          ],
          [
            Victor {
              "x": 1,
              "y": 1,
            },
            Victor {
              "x": 0,
              "y": 1.41,
            },
          ],
          [
            Victor {
              "x": 1,
              "y": -1,
            },
            Victor {
              "x": 1.41,
              "y": 0,
            },
          ],
          [
            Victor {
              "x": -1,
              "y": 1,
            },
            Victor {
              "x": -1.41,
              "y": 0,
            },
          ],
          [
            Victor {
              "x": -1,
              "y": -1,
            },
            Victor {
              "x": 0,
              "y": -1.41,
            },
          ],
        ]
      `);
    });
  });
});
