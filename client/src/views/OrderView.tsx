import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useAppSelector } from "../hooks";
import { IOrderItem } from "../interfaces/Order";
import ErrorMessage from "../components/ErrorMessage";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
} from "../slices/ordersApiSlice";
import PayPalControls from "../components/PayPalControls";

const OrderView = () => {
  const { id: orderId } = useParams();
  const { userInfo } = useAppSelector((state) => state.auth);
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery("");

  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorMessage error={error} />
  ) : (
    <PayPalScriptProvider deferLoading={true} options={{ clientId: "test" }}>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: {userInfo?.name}</strong>
              </p>
              <p>
                <strong>Email: {userInfo?.email}</strong>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAddress?.address},{" "}
                {order.shippingAddress?.city}{" "}
                {order.shippingAddress?.postalCode},{" "}
                {order.shippingAddress?.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  <>Delivered on {order.deliveredAt}</>
                </Message>
              ) : (
                <Message variant="danger">
                  <>Not yet delivered</>
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  <>Paid on {order.paidAt}</>
                </Message>
              ) : (
                <Message variant="danger">
                  <>Not yet paid</>
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.map((i: IOrderItem) => (
                <ListGroup.Item key={i.product}>
                  <Row>
                    <Col md={1}>
                      <Image src={i.image} alt={i.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${i.product}`}>{i.name}</Link>
                    </Col>
                    <Col md={4}>
                      {i.qty} x ${i.price} = ${i.qty * i.price}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items: </Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping: </Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax: </Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total: </Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <ErrorMessage error={error} />}
              </ListGroup.Item>
              {!order.isPaid &&
                (loadingPayPal ? (
                  <Loader />
                ) : errorPayPal ? (
                  <ErrorMessage error={errorPayPal} />
                ) : (
                  <ListGroup.Item>
                    <PayPalScriptProvider
                      options={{ clientId: paypal.clientId, currency: "USD" }}
                    >
                      <PayPalControls
                        orderId={orderId}
                        refetch={refetch}
                        payValue={order.totalPrice}
                      />
                    </PayPalScriptProvider>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </PayPalScriptProvider>
  );
};

export default OrderView;
