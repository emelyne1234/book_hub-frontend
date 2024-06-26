import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../utils/types";

export interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push(action.payload);
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      const index = state.books.findIndex(
        (book) => book._id === action.payload._id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    deleteBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((book) => book._id !== action.payload);
    },
  },
});

export const { addBook, updateBook, deleteBook } = bookSlice.actions;

export default bookSlice.reducer;
