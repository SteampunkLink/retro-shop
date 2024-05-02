import { ListGroup, Row, Col } from "react-bootstrap";
import { addDecimals } from "../../utils/cartUtils";

interface IOrderSummaryProps {
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
}

const OrderSummary = ({
  itemsPrice,
  shippingPrice,
  taxPrice,
  totalPrice,
}: IOrderSummaryProps) => {
  return (
    <>
      <ListGroup.Item>
        <h2>Order Summary</h2>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Items: </Col>
          <Col>${addDecimals(itemsPrice)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Shipping: </Col>
          <Col>${addDecimals(shippingPrice)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Tax: </Col>
          <Col>${addDecimals(taxPrice)}</Col>
        </Row>
      </ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>Total: </Col>
          <Col>${addDecimals(totalPrice)}</Col>
        </Row>
      </ListGroup.Item>
    </>
  );
};

export default OrderSummary;
