/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export const init = createAsyncThunk('todos/fetch', () => {
  return getTodos();
});

type InitialState = {
  loading: boolean,
  todos: Todo[],
};

const initialState: InitialState = {
  loading: false,
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(init.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default todosSlice.reducer;
