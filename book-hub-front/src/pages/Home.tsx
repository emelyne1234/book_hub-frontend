import { useState } from "react";
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
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetAllBooksQuery();

  const booksData: IBooksData = data || { booksCount: 0, books: [] };
  const books: Book[] = booksData.books;

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handlePageSizeChange = (event: any) => {
    setPageSize(Number(event.target.value));
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
          pageSize={pageSize}
          handleSearchChange={handleSearchChange}
          handlePageSizeChange={handlePageSizeChange}
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
