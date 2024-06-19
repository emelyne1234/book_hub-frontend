export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  publication_date: Date;
  summary: string;
  cover_image: string;
  average_rating: number;
}

export interface IBooksData {
  booksCount: number;
  books: Book[];
}
