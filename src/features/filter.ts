/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Status } from '../types/Status';

type State = {
  query: string,
  status: Status,
};

// type ChangeStatusAction = {
//   type: 'filter/STATUS-CHANGE',
//   payload: Status,
// };

// type ChangeQueryAction = {
//   type: 'filter/QUERY-CHANGE',
//   payload: string,
// };

// type Action = ChangeQueryAction | ChangeStatusAction;

const initialState: State = {
  query: '',
  status: 'all',
};

// const changeStatus = (status: Status): ChangeStatusAction => ({ type: 'filter/STATUS-CHANGE', payload: status });

// const changeQuery = (query: string): ChangeQueryAction => ({ type: 'filter/QUERY-CHANGE', payload: query });

// export const actions = { changeStatus, changeQuery };

// const filterReducer = (state = initialState, action: Action): State => {
//   switch (action.type) {
//     case 'filter/QUERY-CHANGE':
//       return {
//         query: action.payload,
//         status: state.status,
//       };

//     case 'filter/STATUS-CHANGE':
//       return {
//         query: state.query,
//         status: action.payload,
//       };

//     default:
//       return state;
//   }
// };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeQuery: (filters, action: PayloadAction<string>) => {
      filters.query = action.payload;
    },
    changeStatus: (filters, action: PayloadAction<Status>) => {
      filters.status = action.payload;
    },
  },
});

export const { changeQuery, changeStatus } = filterSlice.actions;

export default filterSlice.reducer;
