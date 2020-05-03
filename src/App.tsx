import React from 'react';
import { useObservable } from './Tools/Tools';
import { withAsyncHOC } from './Generic/HOC';
import TodoService from './Services/TodoService';
import TodoTemplate from './Layouts/TodoTemplate';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';

/** Notice *********************************************************************
 * If it doesn't work, run the following command.
 * bash ../../patches/apply_patch.sh
 */

function App() {
  const todos = useObservable(TodoService.todos$);
  const AsyncTodoList = withAsyncHOC(TodoList, todos);

  return (
    <TodoTemplate>
      <TodoInsert />
      <AsyncTodoList todos={todos!} />
    </TodoTemplate>
  );
}

export default App;
