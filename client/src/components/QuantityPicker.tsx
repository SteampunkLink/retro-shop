import { Form } from "react-bootstrap";

interface QuantityPickerProps {
  qty: number;
  countInStock: number;
  handleQtyChange: (newQty: number) => void;
}

const QuantityPicker = ({
  qty,
  countInStock,
  handleQtyChange,
}: QuantityPickerProps) => {
  return (
    <Form.Control
      as="select"
      value={qty}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleQtyChange(Number(e.target.value))
      }
    >
      {[...Array(countInStock).keys()].map((c) => (
        <option key={c + 1} value={c + 1}>
          {c + 1}
        </option>
      ))}
    </Form.Control>
  );
};

export default QuantityPicker;
