import React from 'react';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview/web';
import { stylesBind } from '../Tools/Tools';
import ListDataProvider from '../Tools/RecyclerPrivider';
import { TodoItemT, TodoItemsT } from '../Generic/TodoModel'
import TodoListItem, { ItemRemoveFT, ItemToggleFT } from '../Components/TodoListItem';
import styles from './TodoList.module.scss'

/** Warning!!! *****************************************************************
 * It works when you
 * node_modules/recyclerlistview/dist/web/core/dependencies/DataProvider.d.ts
 * getAllData(): any[]               => getAllData(): any[] | any;
 * cloneWithRows(newData: any[], ... => cloneWithRows(newData: any[] | any, ...
 *
 * node_modules/recylerlistview/dist/web/core/RecyclerListView.d.ts
 * rowRenderer: ... JSX.Element | JSX.Element[] | null; => any | JSX.Element | JSX.Element[] | null;
 */

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
  const width = window.innerWidth;
  const dataProviderRule = new ListDataProvider((r1: TodoItemT, r2: TodoItemT) => {
    return r1 !== r2;
  });
  const dataProvider = dataProviderRule.cloneWithRows(todos);

  const layoutProvider = new LayoutProvider(
    (index) => { return ListViewType.TODOLISTITEMS },
    (type, dim) => {
      switch(type) {
        case ListViewType.TODOLISTITEMS: {
          dim.width  = width; // 630.4 584
          dim.height = 55; // 55.2  54.4
          break;
        }
        default:
          dim.width  = 0;
          dim.height = 0;
      }
    }
  );

  const rowRenderer = (viewType: React.ReactText, todo: TodoItemT) => {
    switch (viewType) {
      case ListViewType.TODOLISTITEMS: {
        return (<TodoListItem todo={todo} key={todo.id}
                              onRemove={onRemove} onToggle={onToggle} />);
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
