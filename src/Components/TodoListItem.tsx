import React from 'react';
import cn from 'classnames';
import { IoMdCheckmarkCircleOutline, IoIosRadioButtonOff } from 'react-icons/io';
import { BsTrash } from 'react-icons/bs';
import { TodoItemT } from '../Generic/TodoModel';
import './TodoListItem.scss';

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
    <div className="TodoListItem">
      <div className={cn('checkbox', { checked })} onClick={onToggleClick} >
        {checked ? <IoMdCheckmarkCircleOutline /> : <IoIosRadioButtonOff /> }
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={onRemoveClick} >
        <BsTrash />
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
