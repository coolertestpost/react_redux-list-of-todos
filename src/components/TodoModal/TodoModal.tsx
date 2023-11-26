/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { getUser } from '../../api';
import { User } from '../../types/User';
import { removeCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const { currentTodo } = useAppSelector(state => state.currentTodo);

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setLoading(true);

    getUser(currentTodo?.userId || -1)
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
              {`Todo #${currentTodo?.id}`}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              data-cy="modal-close"
              onClick={() => {
                removeCurrentTodo();
              }}
            />
          </header>

          <div className="modal-card-body">
            <p className="block" data-cy="modal-title">{currentTodo?.title}</p>

            <p className="block" data-cy="modal-user">
              {/* For not completed */}
              {!currentTodo?.completed && <strong className="has-text-danger">Planned</strong>}

              {/* For completed */}
              {currentTodo?.completed && <strong className="has-text-success">Done</strong>}
              {' by '}
              <a href={`mailto:${user?.email}`}>{user?.name}</a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
