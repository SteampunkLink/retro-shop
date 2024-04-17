import { useGetProductsQuery } from "../slices/productsApiSlice";
import { Row, Col } from "react-bootstrap";
import ProductModel from "../models/Product";
import Product from "../components/Product";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const HomeView = () => {
  const { data: products, isLoading, error } = useGetProductsQuery("");
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <h2>Latest Products</h2>
          <Row>
            {products.map((prod: ProductModel) => (
              <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={prod} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeView;
