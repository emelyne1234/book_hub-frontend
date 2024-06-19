import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookByIdQuery, useDeleteBookMutation } from "../services/index";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import FooterComponent from "../components/FooterComponent";
import NavbarComponent from "../components/NavbarComponent";

const BookDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, isError } = useGetBookByIdQuery(id as string);
  const [deleteBook] = useDeleteBookMutation();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (id) {
      await deleteBook(id);
      navigate("/");
    }
  };

  const handleBorrow = () => {
    console.log("Book borrowed!");
  };

  const handleBuy = () => {
    console.log("Book purchased!");
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading book details.</div>;

  return (
    <>
      <NavbarComponent />
      <Container className="my-4">
        <Row>
          <Col className="text-center">
            <Image
              src={`http://localhost:5000/uploads/${book?.cover_image}`}
              alt={book?.title}
              fluid
              rounded
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Card>
              <Card.Body>
                <Card.Title className="text-lg font-semibold mb-3 d-flex justify-content-between align-items-center">
                  {book?.title}
                  <div>
                    <Button
                      variant="outline-primary"
                      className="mr-2"
                      onClick={() => navigate(`/edit-book/${id}`)}
                    >
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" onClick={handleDelete}>
                      <FaTrash />
                    </Button>
                  </div>
                </Card.Title>
                <div className="mb-3">
                  <span className="text-gray-700 mr-2">Author: </span>
                  <span className="text-gray-800 font-medium">
                    {book?.author.username}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-gray-600 mr-2">Genre: </span>
                  <span className="text-gray-800 font-medium">
                    {book?.genre.name}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-gray-600 mr-2">ISBN: </span>
                  <span className="text-gray-800 font-medium">
                    {book?.isbn}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-gray-600 mr-2">Published: </span>
                  <span className="text-gray-800 font-medium">
                    {new Date(book!.publication_date).toDateString()}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-gray-600 mr-2">Summary: </span>
                  <span className="text-gray-800 font-medium">
                    {book?.summary}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-gray-600 mr-2">Average Rating: </span>
                  <span className="text-gray-800 font-medium">
                    {book?.average_rating}
                  </span>
                </div>
                <div className="d-flex justify-content-around mt-4">
                  <Button variant="success" onClick={handleBorrow}>
                    Borrow
                  </Button>
                  <Button variant="primary" onClick={handleBuy}>
                    Buy
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <FooterComponent />
    </>
  );
};

export default BookDetail;
