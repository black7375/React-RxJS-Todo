import { useState } from 'react';
import classNames from 'classnames/bind';

// == Custom Hook ==============================================================
export function useStateOnly<T>(init?: T | null) {
  const result = useState<T>(init!);
  return result[0];
}

// == Style ====================================================================
type stylesT = {
  readonly [key: string]: string;
}

export function stylesBind(styles: stylesT) {
  return classNames.bind(styles);
}
