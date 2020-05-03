import React, { useState, useEffect } from 'react';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview/web';
import { stylesBind } from '../Tools/Tools';
import ListDataProvider from '../Tools/RecyclerProvider';
import { TodoItemT } from '../Generic/TodoModel';
import TodoService from '../Services/TodoService';
import TodoListItem from '../Components/TodoListItem';
import styles from './TodoList.module.scss';

/** Notice *********************************************************************
 * If it doesn't work, run the following command.
 * bash ../../patches/apply_patch.sh
 */

const cx = stylesBind(styles);

const ListViewType = {
  TODOLISTITEMS: 0
}

const TodoList = () => {
  const width = window.innerWidth;
  const renderData = new ListDataProvider(
    (r1: TodoItemT, r2: TodoItemT) => r1 !== r2
  ).cloneWithRows(TodoService.initData);

  const [dataProvider, setDataProvider] = useState(renderData);
  useEffect(() => {
    const sub = TodoService.todos$.subscribe((todos) => {
      setDataProvider(dataProvider.cloneWithRows(todos));
      }
    );
    return () => { sub.unsubscribe(); };
  }, [TodoService.todos$]);

  const layoutProvider = new LayoutProvider(
    (index) => { return ListViewType.TODOLISTITEMS },
    (type, dim) => {
      switch(type) {
        case ListViewType.TODOLISTITEMS: {
          dim.width  = width; // 630.4 584
          dim.height = 55;    // 55.2  54.4
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
        return (<TodoListItem todo={todo} key={todo.id} />);
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
