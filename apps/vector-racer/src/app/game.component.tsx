import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { GameStateDto, RacerDto } from '@vector-racer/lib';

import { GameBLoc } from './game.bloc';
import { NewPlayer } from './newplayer.component';
import { generatePathStr } from './svg.utils';

const cols = 40;
const rows = 40;

const gridSize = 20;

const getCoordinates = (idx: number) => ({
  x: idx % cols,
  y: Math.floor(idx / cols),
});

const fromCoordinates = (x: number, y: number) => y * cols + x;

const cells = Array.from({ length: cols * rows }).map((_, idx) => ({
  idx,
  ...getCoordinates(idx),
  unit: null as null | string,
}));

cells[fromCoordinates(1, 2)].unit = 'player1';

const Track = ({ map }: { map: any }) => {
  return (
    <>
      {map.paths.map((path: any) => {
        const pathStr = generatePathStr(gridSize, path);
        return (
          <path
            key={pathStr}
            d={pathStr}
            stroke="brown"
            fill="transparent"
            strokeWidth={3}
          />
        );
      })}
      {/* Start */}
      <line
        x1={map.start.line[0][0] * gridSize}
        y1={map.start.line[0][1] * gridSize}
        x2={map.start.line[1][0] * gridSize}
        y2={map.start.line[1][1] * gridSize}
        stroke="green"
        strokeWidth={3}
      />
    </>
  );
};

export const Game = ({ game }: { game: GameBLoc }) => {
  const [state, setState] = useState<GameStateDto | null>(null);

  useEffect(() => {
    const sub = game.state$.subscribe({
      next:res=>{
        setState(res);

      },
      complete: () => console.log('complete'),
      error: (err) => console.log(err),
    })

    return () => sub.unsubscribe();
  }, [game]);

  if (!state) return null;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="smallGrid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="gray"
              strokeWidth="0.5"
            />
          </pattern>
          <pattern
            id="grid"
            width={gridSize * 10}
            height={gridSize * 10}
            patternUnits="userSpaceOnUse"
          >
            <rect
              width={gridSize * 10}
              height={gridSize * 10}
              fill="url(#smallGrid)"
            />
            <path
              d={`M ${gridSize * 10} 0 L 0 0 0 ${gridSize * 10}`}
              fill="none"
              stroke="gray"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <Track map={state.map} />
        <rect width="100%" height="100%" fill="url(#grid)" />
        {Object.values(state.racers).map((racer) => (
          <NewPlayer
            key={racer.id}
            racer={racer as RacerDto}
            bloc={game}
            gridSize={gridSize}
          />
        ))}
      </svg>

      <div>Laps: {state.racers['1'].laps}</div>
    </div>
  );
};

export const GameContainer = () => {
  const { id } = useParams<{ id: string }>();

  const game = useMemo(() => new GameBLoc(id!), [id]);
  return <Game game={game} />;
};
