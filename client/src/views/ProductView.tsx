import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useAppDispatch } from "../hooks";
import { useGetOneProductQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import { ICartItem } from "../interfaces/Cart";
import QuantityPicker from "../components/QuantityPicker";
import Reviews from "../components/Reviews";
import Meta from "../components/Meta";
import GoBackBtn from "../components/GoBackBtn";

const ProductView = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetOneProductQuery(productId);

  const addToCartHandler = () => {
    let newCartItem: ICartItem;
    newCartItem = {
      prodId: product._id,
      name: product.name,
      subheading: product.subheading,
      image: product.image,
      description: product.description,
      brand: product.brand,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    };
    dispatch(addToCart(newCartItem));
    navigate("/cart");
  };
  return (
    <>
      <GoBackBtn />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <Meta
            title={product.name}
            description={product.description}
            keywords={product.tags.join(", ")}
          />
          <Row>
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush" className="card-shadow">
                <ListGroup.Item>
                  <h3 className="accent-font">{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} Reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card className="card-shadow">
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <QuantityPicker
                            qty={qty}
                            countInStock={product.countInStock}
                            handleQtyChange={(num) => setQty(num)}
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Reviews
            refetch={refetch}
            reviews={product.reviews}
            prodId={product._id}
          />
        </>
      )}
    </>
  );
};

export default ProductView;
