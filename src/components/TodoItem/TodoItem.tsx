/* eslint-disable max-len */
import React from 'react';
import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { useAppSelector } from '../../app/hooks';
import { setCurrentTodo /* , removeCurrentTodo */ } from '../../features/currentTodo';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { currentTodo } = useAppSelector(state => state.currentTodo);

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
            // if (currentTodo === todo) {
            //   removeCurrentTodo();

            //   return;
            // }

            setCurrentTodo(todo);
          }}
        >
          <span className="icon">
            <i className={classNames('far fa-eye-slash', {
              'fa-eye': currentTodo !== todo,
            })}
            />
          </span>
        </button>
      </td>
    </tr>
  );
};
