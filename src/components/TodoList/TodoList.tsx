/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';

import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

export const TodoList: React.FC = () => {
  const { todos } = useAppSelector(state => state.todos);
  const { query, status } = useAppSelector(state => state.filter);

  const [filterError, setFilterError] = useState(false);
  const [todosToDisplay, setTodosToDisplay] = useState<Todo[]>(todos);

  const checkForMatchingCriteria = (filtredTodos: Todo[]) => {
    if (!filtredTodos.length) {
      setFilterError(true);

      return;
    }

    setFilterError(false);
  };

  const filterTodos = (todosToFilter: Todo[]) => {
    let filtredTodos = todosToFilter;

    filtredTodos = filtredTodos.filter((todo: Todo) => {
      return todo.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    });

    checkForMatchingCriteria(filtredTodos);

    filtredTodos = filtredTodos.filter((todo: Todo) => {
      switch (status as Status) {
        case 'all':
          return true;

        case 'completed':
          return todo.completed;

        case 'active':
          return !todo.completed;

        default:
          return true;
      }
    });

    checkForMatchingCriteria(filtredTodos);

    setTodosToDisplay(filtredTodos);
  };

  useEffect(() => {
    filterTodos(todos);
  }, [todos, query, status]);

  return (
    <>
      {filterError && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      {!filterError && (
        <table className="table is-narrow is-fullwidth">
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {todosToDisplay.map((todo) => (
              <TodoItem key={todo.title} todo={todo} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
