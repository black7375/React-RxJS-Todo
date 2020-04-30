import React from 'react';
import { stylesBind } from '../Tools/Tools';
import { TodoItemT, TodoItemsT } from '../Generic/TodoModel'
import TodoListItem, { ItemRemoveFT, ItemToggleFT } from '../Components/TodoListItem';
import styles from './TodoList.module.scss'

const cx = stylesBind(styles);

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
                      : (<div className={cx('TodoListLoading')}> Loading.. </div>);
  return (
    <div className={cx('TodoList')}>
      {TodoListItems}
    </div>
  );
};

export default React.memo(TodoList);
