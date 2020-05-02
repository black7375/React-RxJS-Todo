import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
import classNames from 'classnames/bind';

// == RxJS =====================================================================
export function useObservable<T>(
  observable: Observable<T>
  ) : T | undefined;
export function useObservable<T, K = keyof T>(
  observable: Observable<T>,
  init?:      K,
  callback?:  (state: T) => K
): K;

export function useObservable<T, K = keyof T> (
  observable: Observable<T>,
  init?:      K,
  callback?:  (state: T) => K): T | K | undefined {
  const [state, setState] = useState<T | K>(init!);

  useEffect(() => {
    const sub = callback
              ? observable.subscribe((data: K | any) => setState(callback(data)))
              : observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable, callback]);

  return state;
};


// == Style ====================================================================
type stylesT = {
  readonly [key: string]: string;
}

export function stylesBind(styles: stylesT) {
  return classNames.bind(styles);
}
