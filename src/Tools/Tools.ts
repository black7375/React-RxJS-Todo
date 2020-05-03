import classNames from 'classnames/bind';

// == Style ====================================================================
type stylesT = {
  readonly [key: string]: string;
}

export function stylesBind(styles: stylesT) {
  return classNames.bind(styles);
}
