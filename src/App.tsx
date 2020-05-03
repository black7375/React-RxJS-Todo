import React from 'react';
import TodoTemplate from './Layouts/TodoTemplate';
import TodoInsert from './Components/TodoInsert';
import TodoList from './Components/TodoList';

/** Notice *********************************************************************
 * If it doesn't work, run the following command.
 * bash ../../patches/apply_patch.sh
 */

function App() {
  return (
    <TodoTemplate>
      <TodoInsert />
      <TodoList />
    </TodoTemplate>
  );
}

export default App;
