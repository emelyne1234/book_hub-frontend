import React from "react";
import { Form, Row, Col } from "react-bootstrap";

interface FilterComponentProps {
  searchQuery: string;
  authorQuery: string;
  genre: string;
  sort: string;
  handleSearchChange: (event: any) => void;
  handleAuthorChange: (event: any) => void;
  handleGenreChange: (event: any) => void;
  handleSortChange: (event: any) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  searchQuery,
  authorQuery,
  genre,
  sort,
  handleSearchChange,
  handleAuthorChange,
  handleGenreChange,
  handleSortChange,
}) => {
  return (
    <Form className="mb-4">
      <Row>
        <Col xs={12} sm={3} className="mb-2 mb-sm-0">
          <Form.Control
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Col>
        <Col xs={12} sm={3} className="mb-2 mb-sm-0">
          <Form.Control
            type="text"
            placeholder="Search by author..."
            value={authorQuery}
            onChange={handleAuthorChange}
          />
        </Col>
        <Col xs={12} sm={3} className="mb-2 mb-sm-0">
          <Form.Control as="select" value={genre} onChange={handleGenreChange}>
            <option value="">All genres</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
          </Form.Control>
        </Col>
        <Col xs={12} sm={3} className="mb-2 mb-sm-0">
          <Form.Control as="select" value={sort} onChange={handleSortChange}>
            <option value="">Sort by</option>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </Form.Control>
        </Col>
      </Row>
    </Form>
  );
};

export default FilterComponent;
