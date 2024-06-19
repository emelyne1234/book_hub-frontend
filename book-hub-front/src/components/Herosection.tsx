import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

const HeroSection = () => {
  const [books, setBooks] = useState<string[]>([]);
  const [currentBookIndex, setCurrentBookIndex] = useState<number>(0);

  const bookImages = [
    "https://images.unsplash.com/photo-1612969308146-066d55f37ccb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGJvb2slMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJvb2tzfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9vayUyMGNvdmVyfGVufDB8fDB8fHww",
  ];

  useEffect(() => {
    preloadImages();

    const interval = setInterval(() => {
      setCurrentBookIndex((prevIndex) =>
        prevIndex === bookImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Preload images for smoother animation
  const preloadImages = () => {
    const images = bookImages.map((image) => {
      const img = new Image();
      img.src = image;
      return img;
    });
    setBooks(images.map((img) => img.src));
  };

  return (
    <section className="hero-section py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6}>
            <h1 className="hero-title">Discover Your Next Favorite Book</h1>
            <p className="hero-subtitle">
              Explore a world of literature with our curated collection.
            </p>
          </Col>
          <Col md={6} className="text-center">
            <div className="hero-book-img-container">
              <img
                src={books[currentBookIndex]}
                alt="Book"
                className="img-fluid hero-book-img"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
