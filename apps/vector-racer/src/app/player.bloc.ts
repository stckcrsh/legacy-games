import { merge, Observable, scan, shareReplay, startWith, Subject, tap } from 'rxjs';
import Vector from 'victor';

import { cardLookup, createPossibleVectors, RacerDto } from '@vector-racer/lib';

type InitAction = {
  type: 'init';
  payload: {
    racer: RacerDto;
    possibleVectors: [Vector, Vector][];
  };
};

type SelectCardAction = {
  type: 'selectCard';
  payload: string;
};

type Actions = SelectCardAction | InitAction;

export interface Player {
  racer: RacerDto;
  possibleVectors: [Vector, Vector][];
  selectedCards: Record<string, boolean>;
}

export class PlayerBLoc {
  private _state$: Observable<Player>;
  private _selectCard$ = new Subject<SelectCardAction>();

  constructor(racer: RacerDto) {
    const possibleVectors = createPossibleVectors(racer, []);

    const commands$: Observable<Actions> = merge(this._selectCard$).pipe(
      startWith({
        type: 'init',
        payload: { racer, possibleVectors },
      } as InitAction)
    );

    this._state$ = commands$.pipe(
      scan((state, action) => {
        switch (action.type) {
          case 'init':
            return {
              ...action.payload,
              selectedCards: {},
            };
          case 'selectCard': {
            const newSelectedCards = {
              ...state.selectedCards,
              [action.payload]: !state.selectedCards[action.payload],
            };
            const cardList = Object.entries(newSelectedCards)
              .filter(([_, value]) => value)
              .map(([key]) =>
                state.racer.hand.find(([deckId]) => deckId === key)
              )
              .filter((res): res is [string, string] => !!res)
              .map(([_, cardId]) => cardLookup[cardId]);
            const possibleVectors = createPossibleVectors(racer, cardList);
            return {
              ...state,
              possibleVectors,
              selectedCards: newSelectedCards,
            };
          }
        }
        return state;
      }, {} as Player),
      tap((res) => console.log('playerbloc', res)),
      shareReplay(1)
    );
  }

  public get state$() {
    return this._state$;
  }

  public selectCard(deckId: string) {
    this._selectCard$.next({ type: 'selectCard', payload: deckId });
  }
}
