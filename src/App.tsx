import React, { useCallback } from 'react';
import { useObservable } from './Tools/Tools';
import { TodoItemT } from './Generic/TodoModel';
import TodoService from './Services/TodoService';
import TodoTemplate from './Layouts/TodoTemplate';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';

function App() {
  const todos = useObservable(TodoService.todos$);

  const onInsert = useCallback((text: TodoItemT['text']) => { TodoService.addItem(text);  }, []);
  const onRemove = useCallback((id:   TodoItemT['id']  ) => { TodoService.removeItem(id); }, []);
  const onToggle = useCallback((id:   TodoItemT['id']  ) => { TodoService.toggleItem(id); }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos!} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
