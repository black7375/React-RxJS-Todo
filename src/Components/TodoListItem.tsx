import React, { useCallback } from 'react';
import { IoMdCheckmarkCircleOutline, IoIosRadioButtonOff } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { stylesBind } from '../Tools/Tools';
import { TodoItemT } from '../Generic/TodoModel';
import TodoService from '../Services/TodoService';
import styles from './TodoListItem.module.scss';

const cx = stylesBind(styles);

interface TodoListItemProps {
  todo: TodoItemT;
  key:  TodoItemT['id'];
  even?: true | undefined;
}

const TodoListItem = ({ todo, even }: TodoListItemProps) => {
  const { id, text, checked } = todo;
  const onRemoveDown = useCallback(() => TodoService.onRemove(id), [id]);
  const onToggleDown = useCallback(() => TodoService.onToggle(id), [id]);

  return (
    <div className={cx('TodoListItem', { even })}>
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
