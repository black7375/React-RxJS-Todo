import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import { configureStore } from '../Tools/Tools';
import TodoService from './TodoService';

const rootEpic = combineEpics(
  TodoService.todosEpic
);

const rootReducer = combineReducers({
    todos: TodoService.todosReducer
});

export type rootEpicT    = typeof rootEpic;
export type rootReducerT = typeof rootReducer;
export type rootStateT   = ReturnType<typeof rootReducer>;

const store = configureStore(rootEpic, rootReducer);
export default store;