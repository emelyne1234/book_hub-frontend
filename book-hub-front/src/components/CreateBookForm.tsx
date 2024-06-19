import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useCreateBookMutation } from "../services/index";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const CreateBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "6671fad65e1d74dabe001c69",
    genre: "6671fc405e1d74dabe001c6e",
    isbn: "",
    publication_date: "",
    summary: "",
    cover_image: null as File | null,
    average_rating: 0,
  });

  const {
    title,
    author,
    genre,
    isbn,
    publication_date,
    summary,
    cover_image,
    average_rating,
  } = formData;

  const [createBook, { isLoading, isError }] = useCreateBookMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", title);
      formDataToSend.append("author", author);
      formDataToSend.append("genre", genre);
      formDataToSend.append("isbn", isbn);
      formDataToSend.append("publication_date", publication_date);
      formDataToSend.append("summary", summary);
      formDataToSend.append("average_rating", String(average_rating));
      if (cover_image) {
        formDataToSend.append("cover_image", cover_image);
      }

      const result = await createBook(formDataToSend).unwrap();
      toast.success(result.message || "Book created successfully!");

      setFormData({
        title: "",
        author: "6671fad65e1d74dabe001c69",
        genre: "6671fc405e1d74dabe001c6e",
        isbn: "",
        publication_date: "",
        summary: "",
        cover_image: null,
        average_rating: 0,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      console.error("Error creating book:", error);
    }
  };

  const handleChange = (e: any) => {
    if (e.target.name === "cover_image") {
      const file = e.target.files ? e.target.files[0] : null;
      setFormData({ ...formData, cover_image: file });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <ToastContainer />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formGenre">
          <Form.Label>Genre</Form.Label>
          <Form.Control as="select" name="genre" value={genre} required>
            <option value="Fantasy">Fantasy</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Mystery">Mystery</option>
            <option value="Romance">Romance</option>
            <option value="Thriller">Thriller</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formISBN">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ISBN"
            name="isbn"
            value={isbn}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPublicationDate">
          <Form.Label>Publication Date</Form.Label>
          <Form.Control
            type="date"
            name="publication_date"
            value={publication_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSummary">
          <Form.Label>Summary</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter summary"
            name="summary"
            value={summary}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCoverImage">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleChange}
            name="cover_image"
            required
          />
        </Form.Group>

        <Form.Group controlId="formAverageRating">
          <Form.Label>Average Rating</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter average rating"
            name="average_rating"
            value={average_rating}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Book"}
        </Button>

        {isError && (
          <div className="text-danger mt-3">
            Error creating book. Please try again later.
          </div>
        )}
      </Form>
    </>
  );
};

export default CreateBookForm;
