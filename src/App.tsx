import React, { useCallback } from 'react';
import { useObservable } from './Tools/Tools';
import { TodoItemT } from './Generic/TodoModel';
import { withAsyncHOC } from './Generic/HOC'
import TodoService from './Services/TodoService';
import TodoTemplate from './Layouts/TodoTemplate';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';

function App() {
  const todos = useObservable(TodoService.todos$);
  const AsyncTodoList = withAsyncHOC(TodoList, todos);

  const onInsert = useCallback((text: TodoItemT['text']) => { TodoService.addItem(text);  }, []);
  const onRemove = useCallback((id:   TodoItemT['id']  ) => { TodoService.removeItem(id); }, []);
  const onToggle = useCallback((id:   TodoItemT['id']  ) => { TodoService.toggleItem(id); }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <AsyncTodoList todos={todos!} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
