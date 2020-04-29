import { useState, useEffect } from 'react';
import { Observable } from 'rxjs';
import classNames from 'classnames/bind';

// == RxJS =====================================================================
export function useObservable<T> (observable: Observable<T>) {
  const [state, setState] = useState<T>();

  useEffect(() => {
    const sub = observable.subscribe(setState);
    return () => sub.unsubscribe();
  }, [observable]);

  return state;
};


// == Style ====================================================================
type stylesT = {
  readonly [key: string]: string;
}

export function stylesBind(styles: stylesT) {
  return classNames.bind(styles);
}
