import { Container, Row, Col } from "react-bootstrap";

const FooterComponent = () => {
  return (
    <footer className="mt-4 py-3 bg-dark text-white">
      <Container>
        <Row>
          <Col>
            <p className="mb-0 text-center">
              &copy; 2024 250 Book-HUB📚 - Kigali-Rwanda
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;
