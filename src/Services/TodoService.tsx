import { List } from 'immutable';
import { BehaviorSubject, Subject } from 'rxjs';
import { scan, map, publishReplay, refCount } from 'rxjs/operators';
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
})());


// == Core Events ==============================================================
const update$ = new BehaviorSubject((todos: TodoItemsT) => todos);
const insert$ = new Subject<TodoItemT>();
const remove$ = new Subject<TodoItemT['id']>();
const toggle$ = new Subject<TodoItemT['id']>();


// == Data =====================================================================
let nextId = largeItemSize + 1;
const todos$ = update$.pipe(
  scan((todos, operation) => operation(todos), largeInitItems),

  // cache
  publishReplay(1),
  refCount()
);


// == Events Implementation ====================================================
insert$.pipe(
  map((todo) => (todos: TodoItemsT) => todos.push(todo))
).subscribe(update$);

remove$.pipe(
  map((id)   => (todos: TodoItemsT) => todos.filter(todo => todo.id !== id))
).subscribe(update$);

toggle$.pipe(
  map((id)   => (todos: TodoItemsT) => todos.map(todo => todo.id === id
    ? todo.set("checked", !todo.checked)
    : todo
  ))
).subscribe(update$);


// == Interface ================================================================
const TodoService = {
  initData: largeInitItems,
  todos$: todos$,

  onInsert: (text: TodoItemT['text']) => {
    insert$.next(new TodoItem({
      id:      nextId,
      text:    text,
      checked: false
    }));
    nextId++;
  },
  onRemove: (id: TodoItemT['id']) => remove$.next(id),
  onToggle: (id: TodoItemT['id']) => toggle$.next(id)
};

export default TodoService;
