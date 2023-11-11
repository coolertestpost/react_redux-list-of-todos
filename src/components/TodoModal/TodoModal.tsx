/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as currentTodoActions } from '../../features/currentTodo';
import { getUser } from '../../api';
import { User } from '../../types/User';

export const TodoModal: React.FC = () => {
  const selectedTodo = useAppSelector(state => state.currentTodo);
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  const removeSelectedTodo = () => dispatch(currentTodoActions.removeTodo());

  useEffect(() => {
    setLoading(true);

    getUser(selectedTodo?.userId || -1)
      .then((response) => {
        setUser(response);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {loading && <Loader />}

      {!loading && (
        <div className="modal-card">
          <header className="modal-card-head">
            <div
              className="modal-card-title has-text-weight-medium"
              data-cy="modal-header"
            >
              {`Todo #${selectedTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                removeSelectedTodo();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{selectedTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!selectedTodo?.completed && <strong className="has-text-danger">Planned</strong>}

              {/* For completed */}
              {selectedTodo?.completed && <strong className="has-text-success">Done</strong>}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};