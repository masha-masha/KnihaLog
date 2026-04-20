import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Book } from '../types/book';

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
        updateBook: (state, action: PayloadAction<Book>) => {
            const index = state.books.findIndex(b => b.id === action.payload.id);
            if (index !== -1) {
                state.books[index] = action.payload;
            }
        },
    }

});

export const { addBook, updateBook, addQuote, deleteBook } = bookSlice.actions;
export default bookSlice.reducer;

