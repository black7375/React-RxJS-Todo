import React from 'react';
import cn from 'classnames'
import { TodoItemT } from '../Generic/TodoModel'

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
        {checked ? "체크 O" : "체크 X"}
        <div className="text">{text}</div>
      </div>
      <div className="remove" onClick={onRemoveClick} >
        삭제
      </div>
    </div>
  );
};

export default React.memo(TodoListItem);
