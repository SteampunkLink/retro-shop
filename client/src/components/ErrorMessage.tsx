import { Alert } from "react-bootstrap";

interface ErrorMessageProps {
  error: any;
}

const ErrorMessage = ({ error }: ErrorMessageProps) => {
  return (
    <Alert variant="danger">
      {typeof error === "string"
        ? error
        : error.data?.message || "An error has occured."}
    </Alert>
  );
};

export default ErrorMessage;
