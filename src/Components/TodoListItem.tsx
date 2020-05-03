import React, { useCallback } from 'react';
import { IoMdCheckmarkCircleOutline, IoIosRadioButtonOff } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { stylesBind } from '../Tools/Tools';
import { TodoItemT } from '../Generic/TodoModel';
import TodoService from '../Services/TodoService';
import styles from './TodoListItem.module.scss';

const cx = stylesBind(styles);

export type ItemRemoveFT = (id: TodoItemT['id']) => void;
export type ItemToggleFT = (id: TodoItemT['id']) => void;

interface TodoListItemProps {
  todo: TodoItemT;
  key: TodoItemT['id'];
}

const TodoListItem = ({ todo }: TodoListItemProps) => {
  const { id, text, checked } = todo;
  const onRemoveDown = useCallback(() => TodoService.onRemove(id), []);
  const onToggleDown = useCallback(() => TodoService.onToggle(id), []);

  return (
    <div className={cx('TodoListItem')}>
      <div className={cx('checkbox', { checked })} onPointerDown={onToggleDown} >
        {checked ? <IoMdCheckmarkCircleOutline /> : <IoIosRadioButtonOff /> }
        <div className={cx('text')}>{text}</div>
      </div>
      <div className={cx('remove')} onPointerDown={onRemoveDown} >
        <BsTrash />
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
