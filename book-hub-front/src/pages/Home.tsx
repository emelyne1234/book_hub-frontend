import { useState, useEffect } from "react";
import { useGetAllBooksQuery } from "../services/index";
import { Spinner, Container, Row } from "react-bootstrap";
import FilterComponent from "../components/FilterComponent";
import BookComponent from "../components/BookComponent";
import { IBooksData, Book } from "../utils/types";
import NavbarComponent from "../components/NavbarComponent";
import FooterComponent from "../components/FooterComponent";
import HeroSection from "../components/Herosection";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [authorQuery, setAuthorQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState("");

  const { data, isLoading, isError } = useGetAllBooksQuery();
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (data) {
      const books: Book[] = data.books;

      const filtered = books.filter((book) => {
        const matchesTitle = book.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesAuthor = book.author.username
          .toLowerCase()
          .includes(authorQuery.toLowerCase());
        const matchesGenre =
          genre === "" || book.genre.name.toLowerCase() === genre.toLowerCase();
        return matchesTitle && matchesAuthor && matchesGenre;
      });

      const sorted = filtered.sort((a, b) => {
        if (sort === "date") {
          return (
            new Date(b.publication_date).getTime() -
            new Date(a.publication_date).getTime()
          );
        } else if (sort === "rating") {
          return b.average_rating - a.average_rating;
        }
        return 0;
      });

      setFilteredBooks(sorted);
    }
  }, [data, searchQuery, authorQuery, genre, sort]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthorQuery(event.target.value);
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  };

  if (isLoading) return <Spinner animation="border" role="status" />;
  if (isError) return <div>Error fetching books</div>;

  return (
    <>
      <NavbarComponent />
      <HeroSection />
      <Container className="mt-4">
        <FilterComponent
          searchQuery={searchQuery}
          authorQuery={authorQuery}
          genre={genre}
          sort={sort}
          handleSearchChange={handleSearchChange}
          handleAuthorChange={handleAuthorChange}
          handleGenreChange={handleGenreChange}
          handleSortChange={handleSortChange}
        />

        <Row>
          {filteredBooks.map((book) => (
            <BookComponent key={book._id} book={book} />
          ))}
        </Row>
      </Container>
      <FooterComponent />
    </>
  );
};

export default Home;
