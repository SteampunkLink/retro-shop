import { ListGroup } from "react-bootstrap";
import Message from "../Message";

interface IPaymentMethodProps {
  paymentMethod: string;
  isPaid: boolean;
  paidAt?: string;
}

const PaymentMethod = ({
  paymentMethod,
  isPaid,
  paidAt,
}: IPaymentMethodProps) => {
  return (
    <ListGroup.Item>
      <h2>Payment Method</h2>
      <p>
        <strong>Method: </strong>
        {paymentMethod}
      </p>
      {isPaid ? (
        <Message variant="success">
          <>Paid on {paidAt?.substring(0, 10)}</>
        </Message>
      ) : (
        <Message variant="danger">
          <>Not yet paid</>
        </Message>
      )}
    </ListGroup.Item>
  );
};

export default PaymentMethod;
