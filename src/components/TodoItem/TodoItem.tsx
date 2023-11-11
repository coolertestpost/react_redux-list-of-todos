/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';

import { actions as currentTodoActions } from '../../features/currentTodo';
import { Todo } from '../../types/Todo';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const selectedTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useAppDispatch();

  const setCurrentTodo = (newCurrentTodo: Todo) => dispatch(currentTodoActions.setTodo(newCurrentTodo));
  const removeCurrentTodo = () => dispatch(currentTodoActions.removeTodo());

  return (
    <tr data-cy="todo" key={todo.id}>
      <td className="is-vcentered">{todo.id}</td>
      <td className="is-vcentered">
        {todo.completed && (
          <span className="icon" data-cy="iconCompleted">
            <i className="fas fa-check" />
          </span>
        )}
      </td>

      <td className="is-vcentered is-expanded">
        <p className="has-text-danger">{todo.title}</p>
      </td>

      <td className="has-text-right is-vcentered">
        <button
          data-cy="selectButton"
          className="button"
          type="button"
          onClick={() => {
            if (selectedTodo === todo) {
              removeCurrentTodo();

              return;
            }

            removeCurrentTodo();
            setCurrentTodo(todo);
          }}
        >
          <span className="icon">
            <i className={classNames('far fa-eye-slash', {
              'fa-eye': selectedTodo !== todo,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
