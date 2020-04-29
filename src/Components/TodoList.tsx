import React from 'react';
import { TodoItemT, TodoItemsT } from '../Generic/TodoModel'
import TodoListItem, { ItemRemoveFT, ItemToggleFT } from '../Components/TodoListItem';
import './TodoList.scss'

interface TodoListProps {
  todos:    TodoItemsT;
  onRemove: ItemRemoveFT;
  onToggle: ItemToggleFT;
}

const TodoList = ({ todos, onRemove, onToggle }: TodoListProps) => {
  const TodoListItems = todos !== undefined
                      ? todos.map((todo: TodoItemT) => (
                        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
                      ))
                      : (<div className="TodoListLoading"> Loading.. </div>);
  return (
    <div className="TodoList">
      {TodoListItems}
    </div>
  );
};

export default React.memo(TodoList);
