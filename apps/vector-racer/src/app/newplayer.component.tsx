import { memo, useEffect, useMemo, useState } from 'react';
import Vector from 'victor';

import { cardLookup, RacerDto } from '@vector-racer/lib';

import { GameBLoc } from './game.bloc';
import { Player, PlayerBLoc } from './player.bloc';
import { generatePath } from './svg.utils';

export const NewPlayer = memo(
  ({
    racer,
    gridSize,
    bloc,
  }: {
    racer: RacerDto;
    gridSize: number;
    bloc: GameBLoc;
  }) => {
    const playerBloc = useMemo(() => new PlayerBLoc(racer), [racer]);
    const [state, setState] = useState<Player | null>(null);

    useEffect(() => {
      const sub = playerBloc.state$.subscribe({
        next: setState,
      });
      return () => sub.unsubscribe();
    }, [playerBloc]);

    if (!racer) {
      return null;
    }

    const moveHandler = (vector: Vector) => () => {
      // get a list of the played cards
      const playedCards = Object.entries(state?.selectedCards || {})
        .filter(([_, active]) => active)
        .reduce((acc, [deckId]) => {
          const card = racer.hand.find(([id]) => id === deckId);
          if (card) {
            return [...acc, card];
          }
          return acc;
        }, [] as any);
      //@ts-ignore
      bloc.move({ racerId: racer.id, cursor: vector, cards: playedCards });
    };

    return (
      <>
        {racer.moves.length &&
          generatePath(gridSize, [
            ...racer.moves,
            [racer.position[0], racer.position[1]],
          ])}
        <circle
          cx={racer.position[0] * gridSize}
          cy={racer.position[1] * gridSize}
          r={gridSize * 0.375}
          fill="red"
        />
        <circle
          onClick={() =>
            bloc.move({
              racerId: racer.id,
              cursor: Vector.fromArray(racer.vector),
            })
          }
          cx={racer.vector[0] * gridSize}
          cy={racer.vector[1] * gridSize}
          r={gridSize * 0.375}
          fill="pink"
          style={{ opacity: 0.5 }}
        />
        {state?.possibleVectors?.map(
          ([direction, vector]: [Vector, Vector]) => (
            <circle
              key={vector.x + ',' + vector.y}
              onClick={moveHandler(vector)}
              cx={vector.x * gridSize}
              cy={vector.y * gridSize}
              r={gridSize * 0.375}
              fill="pink"
              style={{ opacity: 0.5 }}
            />
          )
        )}
        {state?.racer?.hand?.map(([deckId, cardId], idx) => {
          return (
            <text
              key={deckId}
              x={5 * gridSize}
              y={(45 + idx * 2) * gridSize}
              fill={state.selectedCards[deckId] ? 'red' : 'black'}
              fontSize={30}
              onClick={() => playerBloc.selectCard(deckId)}
            >
              {cardLookup[cardId].name}
            </text>
          );
        })}

        <text
          x={30 * gridSize}
          y={(45) * gridSize}
          fill={ 'black'}
          fontSize={30}
        >
          {state?.racer?.discard?.length}
        </text>

      </>
    );
  }
);
