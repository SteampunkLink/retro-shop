import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Loader from "./Loader";
import { IUserInfo, ISubmitFormArgs } from "../interfaces/Auth";

interface IProfileFormProps {
  userInfo: IUserInfo | null;
  isLoading: boolean;
  buttonLabel: string;
  handleSubmitForm: (formFields: ISubmitFormArgs) => void;
}

const RegisterUpdateProfileForm = ({
  userInfo,
  isLoading,
  buttonLabel,
  handleSubmitForm,
}: IProfileFormProps) => {
  const [name, setName] = useState<string>(userInfo?.name || "");
  const [email, setEmail] = useState<string>(userInfo?.email || "");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmitForm({ name, email, password, confirmPassword });
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group controlId="name" className="my-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="email" className="my-3">
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="password" className="my-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="confirmPassword" className="my-3">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Button
        type="submit"
        variant="primary"
        className="mt-2"
        disabled={isLoading}
      >
        {buttonLabel}
      </Button>
      {isLoading && <Loader />}
    </Form>
  );
};

export default RegisterUpdateProfileForm;
