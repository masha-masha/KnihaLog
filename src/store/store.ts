import { configureStore } from '@reduxjs/toolkit';
import bookReducer from "./bookSlice"

export const store = configureStore({
  reducer: {
    books: bookReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem('my-books', JSON.stringify(state.books.books));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;