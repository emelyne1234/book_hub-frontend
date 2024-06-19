import React from "react";
import { Form, Row, Col } from "react-bootstrap";

interface FilterComponentProps {
  searchQuery: string;
  pageSize: number;
  handleSearchChange: (event: React.ChangeEvent) => void;
  handlePageSizeChange: (event: React.ChangeEvent) => void;
}

const FilterComponent: React.FC<FilterComponentProps> = ({
  searchQuery,
  pageSize,
  handleSearchChange,
  handlePageSizeChange,
}) => {
  return (
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
        <Col xs={4}>
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
  );
};

export default FilterComponent;
