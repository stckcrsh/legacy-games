import { Racer } from './racer';
import { GameBLoc } from './game.bloc';
import { VECTOR_GRID, angleOfVectorsRadians, scaleVector } from '@vector-racer/lib';
import { generatePath } from './svg.utils';
import Vector from 'victor';

export const Player = ({
  racer,
  gridSize,
  bloc,
}: {
  racer: Racer;
  gridSize: number;
  bloc: GameBLoc;
}) => {
  console.log(racer)
  racer.position = Vector.fromObject(racer.position);
  racer.vector = Vector.fromObject(racer.vector);

  const racerDirection = angleOfVectorsRadians(
    racer.vector.subtract(racer.position).normalize(),
    new Vector(0, -1)
  );

  // testing out directions and rotations in the library
  // const dir = racer.vector
  //   .subtract(racer.position)
  //   .normalize()
  //   .add(Vector.of([3, 40]));
  // const adir = Vector.of([1, 0])
  //   .rotateByRadians(-racerDirection)
  //   .add(Vector.of([5, 40]));
  return (
    <>
      {racer.moves.length &&
        generatePath(gridSize, [
          ...racer.moves,
          [racer.position.x, racer.position.y],
        ])}
      {/* <line
        x1={3 * gridSize}
        x2={dir.x * gridSize}
        y1={40 * gridSize}
        y2={dir.y * gridSize}
        stroke="black"
        strokeWidth={3}
      ></line>
      <line
        x1={5 * gridSize}
        x2={adir.x * gridSize}
        y1={40 * gridSize}
        y2={adir.y * gridSize}
        stroke="black"
        strokeWidth={3}
      ></line> */}
      <circle
        cx={racer.position.x * gridSize}
        cy={racer.position.y * gridSize}
        r={gridSize * 0.375}
        fill="red"
      />
      <circle
        onClick={() =>
          bloc.move({ racerId: racer.id, cursor: racer.vector })
        }
        cx={racer.vector.x * gridSize}
        cy={racer.vector.y * gridSize}
        r={gridSize * 0.375}
        fill="pink"
        style={{ opacity: 0.5 }}
      />
      {VECTOR_GRID.map(([vector, dir]:any) => {
        let neighbor: Vector;
        console.log(vector, dir)


        const lateralScale = 1.2;
        const forwardScale = 1.5;
        const backwardScale = 0.5;
        const vectors:Record<string, Vector> = {
          'l': Vector.fromArray([lateralScale,0]),
          'r': Vector.fromArray([lateralScale,0]),
          'f': Vector.fromArray([0,forwardScale]),
          'b': Vector.fromArray([0,backwardScale]),
        }

        neighbor = dir.split('').reduce((acc:any, curr:any) => {
          return scaleVector(acc,vectors[curr])
        }, vector)

        if (
          racer.position.x !== racer.vector.x ||
          racer.position.y !== racer.vector.y
        ) {
          neighbor = neighbor.rotateBy(-racerDirection).add(racer.vector);

          // console.log(racer.position, racer.vector, racerDirection, vector)
        } else {
          neighbor = racer.vector.add(neighbor);
        }

        return (
          <circle
            key={neighbor.x + ',' + neighbor.y}
            onClick={() =>
              bloc.move({ racerId: racer.id, cursor: neighbor })
            }
            cx={neighbor.x * gridSize}
            cy={neighbor.y * gridSize}
            r={gridSize * 0.375}
            fill="pink"
            style={{ opacity: 0.5 }}
          />
        );
      })}
      {/*  */}
    </>
  );
};
