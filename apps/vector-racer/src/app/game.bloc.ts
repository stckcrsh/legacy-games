import {
  from,
  map,
  merge,
  Observable,
  scan,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import Vector from 'victor';

import gameService from './game.service';
import { GameState } from '@vector-racer/lib';

interface PotentialMove {
  racerId: string;
  cursor: Vector;
}

// create logging operator for observable
const log =
  <T>(message: string) =>
  (source: Observable<T>) => {
    return source.pipe(tap((res) => console.log(message, res)));
  };

export class GameBLoc {
  private _state$: Observable<GameState>;
  private _move$ = new Subject<PotentialMove>();

  constructor(private gameId: string) {
    const resolvedMove$ = new Subject<GameState>();

    // commands
    const commands$ = merge(
      this.fetchGameState().pipe(map((state) => ({ type: 'init', state }))),
      this._move$.pipe(map((move) => ({ type: 'move', move }))),
      resolvedMove$.pipe(
        log('resolved'),
        map((state) => ({ type: 'resolvedMove', state }))
      )
    );

    // setupeventsource
    this._state$ = commands$.pipe(
      scan((state, action) => {
        console.log('action', action);
        switch (action.type) {
          case 'init':
          case 'resolvedMove':
            // @ts-ignore
            return action.state;
        }
        return state;
      }, {} as GameState),
      tap({
        next:(state) => console.log('updatestate', state),
        error:(err) => console.log('error', err)
      }),
      shareReplay(1)
    );

    // side effects
    commands$.subscribe((action) => {
      switch (action.type) {
        case 'move':
          // @ts-ignore
          this.resolveMove(action.move).subscribe({
            next: (res) => resolvedMove$.next(res),
          });
          break;
      }
    });

    // this.state$.subscribe((res) => console.log('state', res));
  }

  move(move: PotentialMove) {
    this._move$.next(move);
  }

  get state$() {
    return this._state$;
  }

  private resolveMove(move: PotentialMove): Observable<GameState> {
    return from(gameService.move(this.gameId, move));
  }

  private fetchGameState(): Observable<GameState> {
    return from(
      gameService.getGame(this.gameId).then((game) => {
        console.log('game', game)
        return game;
      })
    );
  }
}
