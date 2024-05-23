import { Container, Row, Col } from "react-bootstrap";

interface IFormContainer {
  children: JSX.Element[];
}

const FormContainer = ({ children }: IFormContainer) => {
  return (
    <Container>
      <Row>
        <Col
          xs={12}
          md={6}
          className="mx-auto card rounded card-shadow bg-secondary"
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
