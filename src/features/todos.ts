import { Todo } from '../types/Todo';

const initialTodos: Todo[] = [];

type SetAction = {
  type: 'todos/SET',
  payload: Todo[]
};

type Action = SetAction;

const set = (payload: Todo[]): Action => ({ type: 'todos/SET', payload });

export const actions = { set };

const todosReducer = (todos = initialTodos, action: Action): Todo[] => {
  switch (action.type) {
    case 'todos/SET':
      return action.payload;

    default:
      return todos;
  }
};

export default todosReducer;
