import React, { useState } from "react";
import { Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAppSelector } from "../hooks";
import { useCreateReviewMutation } from "../slices/productsApiSlice";
import { IReview } from "../interfaces/Product";
import Message from "./Message";
import Rating from "./Rating";
import Loader from "./Loader";

interface IReviewsProps {
  refetch: () => void;
  reviews: IReview[];
  prodId: string;
}

const Reviews = ({ refetch, reviews, prodId }: IReviewsProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [createReview, { isLoading: reviewLoading }] =
    useCreateReviewMutation();

  const { userInfo } = useAppSelector((state) => state.auth);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please select a rating.");
    } else {
      try {
        const data = {
          rating,
          comment,
        };
        await createReview({ prodId, data }).unwrap();
        refetch();
        toast.success("Review Submitted");
        setRating(0);
        setComment("");
      } catch (error: any) {
        toast.error(error.data.message || error.error);
      }
    }
  };
  return (
    <Row className="reviews">
      <Col md={6} className="accent-font mx-auto">
        <h2>Reviews</h2>
      </Col>
      {reviews.length === 0 && (
        <Message>
          <p>No Reviews</p>
        </Message>
      )}
      <ListGroup variant="flush" className="card-shadow bg-success mb-4">
        {reviews.map((review) => (
          <ListGroup.Item key={review._id} className="bg-success">
            <strong>{review.name}</strong>
            <Rating value={review.rating} />
            <p>{review.createdAt.substring(0, 10)}</p>
            <p>{review.comment}</p>
          </ListGroup.Item>
        ))}
        <ListGroup.Item className="bg-success">
          <h2>Write a Review</h2>
          {reviewLoading && <Loader />}
          {userInfo ? (
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="rating" className="my-2">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  as="select"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="">Select</option>
                  <option value="1">1 - Poor</option>
                  <option value="2">2 - Fair</option>
                  <option value="3">3 - Good</option>
                  <option value="4">4 - Very Good</option>
                  <option value="5">5 - Excellent</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="comment" className="my-2">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Button disabled={reviewLoading} type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          ) : (
            <Message variant="danger">
              <p>You must be logged in to review.</p>
            </Message>
          )}
        </ListGroup.Item>
      </ListGroup>
    </Row>
  );
};

export default Reviews;
