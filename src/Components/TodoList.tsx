import React, { useState } from 'react';
import { RecyclerListView, DataProvider, LayoutProvider } from 'recyclerlistview/web';
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

const ListViewType = {
  TODOLISTITEMS: 0
}


const TodoList = ({ todos, onRemove, onToggle }: TodoListProps) => {
  const renderData = todos.map((todo: TodoItemT) => (
    <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
  )).toArray();

  let width = window.innerWidth;
  let dataProviderRule = new DataProvider((r1, r2) => { return r1 !== r2; });

  const [dataProvider, setDataProvider] = useState(
    dataProviderRule.cloneWithRows(renderData)
  );

  const layoutProvider = new LayoutProvider(
    (index) => { return ListViewType.TODOLISTITEMS },
    (type, dim) => {
      switch(type) {
        case ListViewType.TODOLISTITEMS: {
          dim.width = 630; // 630.4 584
          dim.height = 55; // 55.2  54.4
          break;
        }
        default:
          dim.width  = 0;
          dim.height = 0;
      }
    }
  );

  const rowRenderer = (viewType: React.ReactText, todos: JSX.Element[]) => {
    switch (viewType) {
      case ListViewType.TODOLISTITEMS: {
        return todos;
      }
      default:
        return null;
    }
  }

  return (
    <div className={cx('TodoList')}>
      <RecyclerListView dataProvider={dataProvider} layoutProvider={layoutProvider}
                        rowRenderer={rowRenderer} />
    </div>
  );
};

export default React.memo(TodoList);
