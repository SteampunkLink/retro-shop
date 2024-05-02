import { Link } from "react-router-dom";
import { ListGroup, Row, Col, Image } from "react-bootstrap";
import { IOrderItem } from "../../interfaces/Order";

interface IOrderItemsProps {
  orderItems: IOrderItem[];
}

const OrderItems = ({ orderItems }: IOrderItemsProps) => {
  return (
    <ListGroup.Item>
      <h2>Order Items</h2>
      {orderItems.map((i: IOrderItem) => (
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
  );
};

export default OrderItems;
