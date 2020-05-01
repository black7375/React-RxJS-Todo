import React from 'react';
import { stylesBind } from '../Tools/Tools';
import styles from './HOC.module.scss'

const cx = stylesBind(styles);

export function withAsyncHOC<T, K = keyof T>(
  WrappedComponent: React.FC<T>, state: K | undefined) {

  return state
       ? (props: T) => (<WrappedComponent {...props} />)
       : (props: T) => (<div className={cx('Loading')}> Loading...</div>);
};
