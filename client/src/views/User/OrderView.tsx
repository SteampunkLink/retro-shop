import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Card } from "react-bootstrap";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useAppSelector } from "../../hooks";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
} from "../../slices/ordersApiSlice";
import ShippingAddress from "../../components/SingleOrderPage/ShippingAddress";
import PaymentMethod from "../../components/SingleOrderPage/PaymentMethod";
import OrderItems from "../../components/SingleOrderPage/OrderItems";
import OrderSummary from "../../components/SingleOrderPage/OrderSummary";
import PayPalControls from "../../components/SingleOrderPage/PayPalControls";

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
      <p>
        <strong>Name: {userInfo?.name}</strong>
      </p>
      <p>
        <strong>Email: {userInfo?.email}</strong>
      </p>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush" className="card-shadow">
            <ShippingAddress
              address={order.shippingAddress}
              deliveryStatus={{
                isDelivered: order.isDelivered,
                deliveredAt: order.deliveredAt,
              }}
            />
            <PaymentMethod
              isPaid={order.isPaid}
              paidAt={order.paidAt}
              paymentMethod={order.paymentMethod}
            />
            <OrderItems orderItems={order.orderItems} />
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card className="card-shadow">
            <OrderSummary
              itemsPrice={order.itemsPrice}
              shippingPrice={order.shippingPrice}
              taxPrice={order.taxPrice}
              totalPrice={order.totalPrice}
            />
            <ListGroup variant="flush">
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
