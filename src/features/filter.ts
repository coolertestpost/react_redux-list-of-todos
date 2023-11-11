/* eslint-disable max-len */
import { Status } from '../types/Status';

type State = {
  query: string,
  status: Status,
};

type ChangeStatusAction = {
  type: 'filter/STATUS-CHANGE',
  payload: Status,
};

type ChangeQueryAction = {
  type: 'filter/QUERY-CHANGE',
  payload: string,
};

type Action = ChangeQueryAction | ChangeStatusAction;

const initialState: State = {
  query: '',
  status: 'all',
};

const changeStatus = (status: Status): ChangeStatusAction => ({ type: 'filter/STATUS-CHANGE', payload: status });

const changeQuery = (query: string): ChangeQueryAction => ({ type: 'filter/QUERY-CHANGE', payload: query });

export const actions = { changeStatus, changeQuery };

const filterReducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case 'filter/QUERY-CHANGE':
      return {
        query: action.payload,
        status: state.status,
      };

    case 'filter/STATUS-CHANGE':
      return {
        query: state.query,
        status: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
