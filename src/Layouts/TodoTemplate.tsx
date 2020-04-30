import React from 'react';
import { stylesBind } from '../Tools/Tools';
import styles from './TodoTemplate.module.scss';

const cx = stylesBind(styles);

interface TodoTemplateProps {
  children?: React.ReactNode
}
type TodoTemplateT = React.FunctionComponent<TodoTemplateProps>

const TodoTemplate: TodoTemplateT = ({ children }) => {
  return (
    <div className={cx('TodoTemplate')}>
      <div className={cx('app-title')}>Todo App</div>
      <div className={cx('content')}>{children}</div>
    </div>
  );
};

export default TodoTemplate;
