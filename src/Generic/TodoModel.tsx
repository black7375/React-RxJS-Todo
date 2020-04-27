import { List, Record } from "immutable";

interface TodoItemI {
  id:      number;
  text:    string;
  checked: boolean;
}

export const TodoItem: Record.Factory<TodoItemI> = Record({
  id:      0,
  text:    "",
  checked: false,
} as TodoItemI);
export type TodoItemT = Record<TodoItemI> & Readonly<TodoItemI>;

export type TodoItemsT = List<TodoItemT>;
