import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { ICreateAddressFields } from "../interfaces/Address";

interface IAddressFormParams {
  shippingAddress?: ICreateAddressFields;
  handleSubmit: (fields: ICreateAddressFields) => void;
}

const AddressForm = ({ shippingAddress, handleSubmit }: IAddressFormParams) => {
  const [recipient, setRecipient] = useState<string>(
    shippingAddress?.recipient || ""
  );
  const [address, setAddress] = useState<string>(
    shippingAddress?.address || ""
  );
  const [city, setCity] = useState<string>(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState<string>(
    shippingAddress?.postalCode || ""
  );
  const [country, setCountry] = useState<string>(
    shippingAddress?.country || ""
  );
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit({ recipient, address, city, postalCode, country });
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group controlId="recipient" className="my-2">
        <Form.Label>To</Form.Label>
        <Form.Control
          type="text"
          placeholder="Recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="address" className="my-2">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="city" className="my-2">
        <Form.Label>City</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="postalCode" className="my-2">
        <Form.Label>Postal Code</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Postal Code"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="country" className="my-2">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button type="submit" variant="primary" className="my-2">
        Continue
      </Button>
    </Form>
  );
};

export default AddressForm;
