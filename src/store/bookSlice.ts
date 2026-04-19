import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book, BookStatus } from '../types/book';

interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [], 
};

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Omit<Book, 'id' | 'quotes'>>) => {
      state.books.push({
        ...action.payload,
        id: Date.now().toString(),
        quotes: [],
      });
    },
    updateBookStatus: (state, action: PayloadAction<{ id: string; status: BookStatus }>) => {
      const book = state.books.find(b => b.id === action.payload.id);
      if (book) book.status = action.payload.status;
    },
    addQuote: (state, action: PayloadAction<{ bookId: string; text: string; page?: string }>) => {
      const book = state.books.find(b => b.id === action.payload.bookId);
      if (book) {
        book.quotes.push({
          id: Date.now().toString(),
          text: action.payload.text,
          page: action.payload.page,
          dateAdded: new Date().toISOString(),
        });
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter(b => b.id !== action.payload);
    },
  },
});

export const { addBook, updateBookStatus, addQuote, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;

