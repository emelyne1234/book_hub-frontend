import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book, IBooksData } from "../utils/types";

export const bookHubApi = createApi({
  reducerPath: "bookHubApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    // Fetch all books
    getAllBooks: builder.query<IBooksData, void>({
      query: () => "books",
    }),

    // Fetch a book by ID
    getBookById: builder.query<Book, string>({
      query: (id) => `books/${id}`,
    }),

    // Create a new book
    createBook: builder.mutation({
      query: (newBook) => ({
        url: `books`,
        method: "POST",
        body: newBook,
      }),
    }),

    // Update an existing book
    updateBook: builder.mutation<Book, Partial<Book>>({
      query: ({ _id, ...updates }) => ({
        url: `books/${_id}`,
        method: "PUT",
        body: updates,
      }),
    }),

    // Delete a book
    deleteBook: builder.mutation<void, string>({
      query: (_id) => ({
        url: `books/${_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
} = bookHubApi;
export const bookHubApiReducer = bookHubApi.reducer;
