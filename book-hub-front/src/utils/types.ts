export interface Book {
  _id: string;
  title: string;
  author: IAuther;
  genre: IGenre;
  isbn: string;
  publication_date: Date;
  summary: string;
  cover_image: string;
  average_rating: number;
}
interface IAuther {
  _id: string;
  username: string;
}

export interface IGenre {
  id: string;
  name: string;
}

export interface IUser {
  id: string;
  name: string;
}

export interface IBooksData {
  booksCount: number;
  books: Book[];
}
