import { ListGroup } from "react-bootstrap";
import { IShippingAddress } from "../../interfaces/Order";
import Message from "../Message";

interface IShippingAddressComponentProps {
  address: IShippingAddress;
  deliveryStatus: {
    isDelivered: boolean;
    deliveredAt?: string;
  };
}

const ShippingAddress = ({
  address,
  deliveryStatus,
}: IShippingAddressComponentProps) => {
  return (
    <ListGroup.Item>
      <h2>Shipping</h2>
      <p>
        <strong>Name: {address.recipient}</strong>
      </p>
      <p>
        <strong>Address:</strong> {address.address}, {address.city}{" "}
        {address.postalCode}, {address.country}
      </p>
      {deliveryStatus.isDelivered ? (
        <Message variant="success">
          <>Delivered on {deliveryStatus.deliveredAt?.substring(0, 10)}</>
        </Message>
      ) : (
        <Message variant="danger">
          <>Not yet delivered</>
        </Message>
      )}
    </ListGroup.Item>
  );
};

export default ShippingAddress;
