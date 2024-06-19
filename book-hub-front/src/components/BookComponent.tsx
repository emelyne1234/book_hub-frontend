import React from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Book } from "../utils/types";

interface BookComponentProps {
  book: Book;
}

const BookComponent: React.FC<BookComponentProps> = ({ book }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <Col md={4} sm={6} xs={12} className="mb-4">
      <Card
        className="h-100 shadow-lg rounded-lg overflow-hidden"
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <div
          className="book-cover-image"
          style={{
            backgroundImage: `url(http://localhost:5000/uploads/${book.cover_image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "200px",
          }}
        ></div>
        <Card.Body className="p-3">
          <Card.Title className="text-lg font-semibold mb-2">
            {book.title}
          </Card.Title>
          <div className="mb-2">
            <span className="text-gray-700 mr-2">Author: </span>
            <span className="text-gray-800 font-medium">
              {book.author.username}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-gray-600 mr-2">Published: </span>
            <span className="text-gray-800 font-medium">
              {new Date(book.publication_date).toDateString()}
            </span>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default BookComponent;
