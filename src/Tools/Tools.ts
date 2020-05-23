import { useState } from 'react';
import { Action, createStore, applyMiddleware } from 'redux';
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';
import { Epic, createEpicMiddleware, ofType } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';
import classNames from 'classnames/bind';
import { rootEpicT, rootReducerT, rootStateT } from '../Services';

// == Custom Hook ==============================================================
export function useStateOnly<T>(init?: T | null) {
  const result = useState<T>(init!);
  return result[0];
}

export const useSelector: TypedUseSelectorHook<rootStateT> = useReduxSelector;

// == Redux Observable =========================================================
export interface ActionT<T> extends Action<T> {
  type: T;
}

export function createEpic<T, K extends ActionT<T>>(eventT: T): Epic<K, K> {
  return (action$, store$) => action$.pipe(ofType(eventT));
}

const epicMiddleware = createEpicMiddleware();
export function configureStore(rootEpic: rootEpicT, rootReducer: rootReducerT) {
  const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(epicMiddleware)
  ));

  epicMiddleware.run(rootEpic);
  return store;
}

// == Style ====================================================================
type stylesT = {
  readonly [key: string]: string;
}

export function stylesBind(styles: stylesT) {
  return classNames.bind(styles);
}
