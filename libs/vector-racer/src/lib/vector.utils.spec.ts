import Vector from 'victor';
import { angleOfVectorsRadians } from './vector.utils';
describe('angleOfVectorsRadians', () => {
  it('should return the angle between two vectors', () => {
    /**
     * 0,-1
     *  |
     *  |
     *  o--- 1,0
     */
    expect(angleOfVectorsRadians(new Vector(1,0), new Vector(0,-1))).toEqual(-Math.PI/2)
    expect(angleOfVectorsRadians(new Vector(0,-1), new Vector(1,0))).toEqual(Math.PI/2)

    /**
     *      0,-1
     *        |
     *        |
     * -1,0 --o
     */
    expect(angleOfVectorsRadians(new Vector(0,-1), new Vector(-1,0))).toEqual(-Math.PI/2)
    expect(angleOfVectorsRadians(new Vector(-1,0), new Vector(0,-1))).toEqual(Math.PI/2)

    /**
     * o--- 1,0
     *  \
     *   \
     *   1,1
     */
    expect(angleOfVectorsRadians(new Vector(1,1), new Vector(1,0))).toEqual(-Math.PI/4)
    expect(angleOfVectorsRadians(new Vector(1,0), new Vector(1,1))).toEqual(Math.PI/4)

    // 180 degrees
    expect(angleOfVectorsRadians(new Vector(1,0), new Vector(-1,0))).toEqual(Math.PI)
    expect(angleOfVectorsRadians(new Vector(-1,0), new Vector(1,0))).toEqual(-Math.PI)

    // 135 degrees
    expect(angleOfVectorsRadians(new Vector(1,1), new Vector(0,-1))).toEqual(-Math.PI*3/4)
    expect(angleOfVectorsRadians(new Vector(1,1), new Vector(-1,0))).toEqual(Math.PI*3/4)
  })

})
