import { map, Observable } from 'rxjs';

export function select<T, R>(selector: (data: T) => R) {
  return (source: Observable<T>) => {
    return source.pipe(map(selector));
  };
}
