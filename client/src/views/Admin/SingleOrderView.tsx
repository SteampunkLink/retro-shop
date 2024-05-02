import { useParams } from "react-router-dom";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import {
  useGetOrderByIdQuery,
  useDeliverOrderMutation,
} from "../../slices/ordersApiSlice";
import ShippingAddress from "../../components/SingleOrderPage/ShippingAddress";
import PaymentMethod from "../../components/SingleOrderPage/PaymentMethod";
import OrderItems from "../../components/SingleOrderPage/OrderItems";
import OrderSummary from "../../components/SingleOrderPage/OrderSummary";
import { toast } from "react-toastify";

const SingleOrderView = () => {
  const { id: orderId } = useParams();
  const {
    data: order,
    refetch,
    isLoading: orderLoading,
    error: orderError,
  } = useGetOrderByIdQuery(orderId);

  const [deliverOrder, { isLoading: deliverLoading }] =
    useDeliverOrderMutation();

  const deliverOrderHandler = async () => {
    try {
      const updatedOrder: any = await deliverOrder(orderId);
      if (!updatedOrder || updatedOrder.error) {
        throw new Error("Server Error");
      } else {
        refetch();
        toast.success("Order delivered");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return orderLoading ? (
    <Loader />
  ) : orderError ? (
    <ErrorMessage error={orderError} />
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <p>
        <strong>Name: {order.user.name}</strong>
      </p>
      <p>
        <strong>Email: {order.user.email}</strong>
      </p>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
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
          <Card>
            <ListGroup variant="flush">
              <OrderSummary
                itemsPrice={order.itemsPrice}
                shippingPrice={order.shippingPrice}
                taxPrice={order.taxPrice}
                totalPrice={order.totalPrice}
              />
              {deliverLoading && <Loader />}
              {order.isPaid && (
                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn btn-block"
                    onClick={deliverOrderHandler}
                  >
                    Mark as Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SingleOrderView;
