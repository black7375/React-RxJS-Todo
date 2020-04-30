import React from 'react';
import { IoMdCheckmarkCircleOutline, IoIosRadioButtonOff } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { stylesBind } from '../Tools/Tools';
import { TodoItemT } from '../Generic/TodoModel';
import styles from './TodoListItem.module.scss';

const cx = stylesBind(styles);

export type ItemRemoveFT = (id: TodoItemT['id']) => void;
export type ItemToggleFT = (id: TodoItemT['id']) => void;

interface TodoListItemProps {
  todo: TodoItemT;
  key: TodoItemT['id'];
  onRemove: ItemRemoveFT;
  onToggle: ItemToggleFT;
}

const TodoListItem = ({ todo, onRemove, onToggle }: TodoListItemProps) => {
  const { id, text, checked } = todo;
  const onRemoveClick = () => { onRemove(id); };
  const onToggleClick = () => { onToggle(id); };

  return (
    <div className={cx('TodoListItem')}>
      <div className={cx('checkbox', { checked })} onClick={onToggleClick} >
        {checked ? <IoMdCheckmarkCircleOutline /> : <IoIosRadioButtonOff /> }
        <div className={cx('text')}>{text}</div>
      </div>
      <div className={cx('remove')} onClick={onRemoveClick} >
        <BsTrash />
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
