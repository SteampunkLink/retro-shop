import { Alert } from "react-bootstrap";

interface IErrorMessageProps {
  error: any;
}

const ErrorMessage = ({ error }: IErrorMessageProps) => {
  return (
    <Alert variant="danger">
      {typeof error === "string"
        ? error
        : error.data?.message || "An error has occured."}
    </Alert>
  );
};

export default ErrorMessage;
