import { Alert } from "react-bootstrap";

interface IMessageProps {
  variant?: string;
  children: JSX.Element;
}

const Message = ({ variant = "info", children }: IMessageProps) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
