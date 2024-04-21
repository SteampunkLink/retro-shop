import { Link, useNavigate } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button, Card } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../hooks";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";
import QuantityPicker from "../components/QuantityPicker";
import CartItemModel from "../models/CartItem";

const CartView = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const { cartItems } = cart;
  const addToCartHandler = async (item: CartItemModel, newQty: number) => {
    dispatch(addToCart({ ...item, qty: newQty }));
  };
  const removeFromCartHanlder = async (id: string) => {
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h2 style={{ marginBottom: "20px" }}>Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            <>
              Your cart is empty. <Link to="/">Go Back</Link>
            </>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.prodId}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.prodId}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <QuantityPicker
                      qty={item.qty}
                      countInStock={item.countInStock}
                      handleQtyChange={(num) => addToCartHandler(item, num)}
                    />
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHanlder(item.prodId)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Subtotal: ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h3>
              $
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartView;
