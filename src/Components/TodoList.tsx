import React, { useState, useEffect } from 'react';
import { RecyclerListView, LayoutProvider } from 'recyclerlistview/web';
import { useStateOnly, stylesBind } from '../Tools/Tools';
import ListDataProvider from '../Tools/RecyclerProvider';
import { TodoItemT } from '../Generic/TodoModel';
import TodoService from '../Services/TodoService';
import ExternalScrollView from '../Layouts/ExternalScrollView';
import TodoListItem from './TodoListItem';
import styles from './TodoList.module.scss';

/** Notice *********************************************************************
 * If it doesn't work, run the following command.
 * bash ../../patches/apply_patch.sh
 */

const cx = stylesBind(styles);

enum ListViewType {
  ODDITEMS  = 0,
  EVENITEMS = 1
}

const TodoList = () => {
  const width = window.innerWidth;
  const renderData = new ListDataProvider(
    (r1: TodoItemT, r2: TodoItemT) => r1 !== r2
  ).cloneWithRows(TodoService.initData);

  const [dataProvider, setDataProvider] = useState(renderData);
  useEffect(() => {
    const sub = TodoService.todos$.subscribe((todos) => {
      setDataProvider((dataProvider) => dataProvider.cloneWithRows(todos));
      }
    );
    return () => { sub.unsubscribe(); };
  }, []);

  const layoutProvider = useStateOnly(new LayoutProvider(
    (index) => {
      if (index % 2 !== 0) {
        return ListViewType.ODDITEMS;
      } else {
        return ListViewType.EVENITEMS;
      }
    },
    (type, dim) => {
      switch(type) {
        case ListViewType.ODDITEMS: {
          dim.width  = width; // 630.4 584
          dim.height = 60;    // 55.2  54.4
          break;
        }
        case ListViewType.EVENITEMS: {
          dim.width  = width; // 630.4 584
          dim.height = 60;    // 55.2  54.4
          break;
        }
        default:
          dim.width  = 0;
          dim.height = 0;
      }
    }
  ));

  const rowRenderer = (viewType: React.ReactText, todo: TodoItemT) => {
    switch (viewType) {
      case ListViewType.ODDITEMS: {
        return (<TodoListItem todo={todo} key={todo.id} />);
      }
      case ListViewType.EVENITEMS: {
        return (<TodoListItem todo={todo} key={todo.id} even />);
      }
      default:
        return null;
    }
  }

  return (
    <div className={cx('TodoList')}>
      <RecyclerListView dataProvider={dataProvider} layoutProvider={layoutProvider}
                        rowRenderer={rowRenderer} externalScrollView={ExternalScrollView}
                        canChangeSize
      />
    </div>
  );
};

export default React.memo(TodoList);
