import { List } from 'immutable';
import { combineEpics } from 'redux-observable';
import { ActionT } from '../Tools/Tools';
import { TodoItem, TodoItemsT, TodoItemT } from '../Generic/TodoModel';

// == Large Size Sample ========================================================
const largeItemSize = 2500;
const largeInitItems = List((() => {
  const array = [];
  for (let i = 0; i < largeItemSize; i++) {
    array.push(new TodoItem({
      id: i,
      text: `Task ${i}`,
      checked: false
    }));
  }
  return array;
})()) as TodoItemsT;

let nextId = largeItemSize + 1;

// == Action ===================================================================
enum TodoItemsE {
  INSERT = 'TodoEvent/INSERT',
  REMOVE = 'TodoEvent/REMOVE',
  TOGGLE = 'TodoEvent/TOGGLE'
}
interface TodoItemsA extends TodoItemT, ActionT<TodoItemsE> {
  todo: TodoItemT;
}

const insert = (text: TodoItemT['text']) => ({
  type: TodoItemsE.INSERT,
  todo: new TodoItem({
    id:      nextId++,
    text:    text,
    checked: false
  })
} as TodoItemsA);
const  remove = (id: TodoItemT['id']) => ({
  type: TodoItemsE.REMOVE,
  id: id
} as TodoItemsA);
const  toggle = (id: TodoItemT['id']) => ({
  type: TodoItemsE.TOGGLE,
  id: id
} as TodoItemsA);


// == Reducer ==================================================================
const todoItemsReducer = (todos = largeInitItems, action: TodoItemsA) => {
  switch(action.type) {
    case TodoItemsE.INSERT:
      return todos.push(action.todo);
    case TodoItemsE.REMOVE:
      return todos.filter(todo => todo.id !== action.id);
    case TodoItemsE.TOGGLE:
      return todos.map(   todo => todo.id === action.id
                                ? todo.set("checked", !todo.checked)
                                : todo
      );
    default:
      return todos;
  }
};

// == Interface ================================================================
const TodoService = {
  todosEpic: combineEpics(
  ),
  todosReducer: todoItemsReducer,

  onInsert: insert,
  onRemove: remove,
  onToggle: toggle
};

export default TodoService;
