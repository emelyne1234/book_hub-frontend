import React, { useState } from "react";
import { useGetAllBooksQuery } from "../services/index";
import {
  Spinner,
  Card,
  Form,
  Button,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { IBooksData, Book } from "../utils/types";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useGetAllBooksQuery();

  // Ensure data is defined
  const booksData: IBooksData = data || { booksCount: 0, books: [] };
  const books: Book[] = booksData.books;

  // Filter and paginate books
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalBooks = filteredBooks.length;
  const totalPages = Math.ceil(totalBooks / pageSize);

  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageSizeChange = (event: any) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1); // Reset to first page when changing page size
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <Spinner animation="border" role="status" />;
  if (isError) return <div>Error fetching books</div>;

  return (
    <Container className="mt-4">
      {/* Search and Filter Bar */}
      <Form className="mb-4">
        <Row>
          <Col xs={8}>
            <Form.Control
              type="text"
              placeholder="Search books..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Col>
          <Col xs={2}>
            <Form.Control
              as="select"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </Form.Control>
          </Col>
        </Row>
      </Form>

      {/* Book Cards */}
      <Row>
        {paginatedBooks.map((book) => (
          <Col key={book._id} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src={book.cover_image} />
              <Card.Body>
                <Card.Title>{book.title}</Card.Title>
                <Card.Text>Author: {book.author}</Card.Text>
                <Card.Text>Genre: {book.genre}</Card.Text>
                <Card.Text>
                  Published: {book.publication_date.toString()}
                </Card.Text>
                <Card.Text>Rating: {book.average_rating}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="outline-primary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="outline-primary"
          className="ml-2"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default Home;
