import { useEffect, useState } from 'react';
import { GameBLoc } from './game.bloc';
import { Racer } from './racer';
import { generatePath } from './svg.utils';

export const NewPlayer = ({
  racer:{id},
  gridSize,
  bloc,
}: {
  racer: Racer;
  gridSize: number;
  bloc: GameBLoc;
}) => {
  const [racer, setRacer] = useState<Racer | null>(null);

  useEffect(() => {
    const sub = bloc.state$.subscribe((state) => {
      setRacer(state.racers[id]);
    });
    return () => sub.unsubscribe();
  }, [bloc.state$, id])

  if (!racer) {
    return null;
  }

  return (
    <>
    {racer.moves.length &&
        generatePath(gridSize, [
          ...racer.moves,
          [racer.position.x, racer.position.y],
        ])}
      <circle
        cx={racer.position.x * gridSize}
        cy={racer.position.y * gridSize}
        r={gridSize * 0.375}
        fill="red"
      />
      <circle
        onClick={() => bloc.move({ racerId: racer.id, cursor: racer.vector })}
        cx={racer.vector.x * gridSize}
        cy={racer.vector.y * gridSize}
        r={gridSize * 0.375}
        fill="pink"
        style={{ opacity: 0.5 }}
      />
      {racer.possibleVectors?.map(([direction, vector]) => (
        <circle
          key={vector.x + ',' + vector.y}
          onClick={() => bloc.move({ racerId: racer.id, cursor: vector })}
          cx={vector.x * gridSize}
          cy={vector.y * gridSize}
          r={gridSize * 0.375}
          fill="pink"
          style={{ opacity: 0.5 }}
        />
      ))}
      {racer}
    </>
  );
};
