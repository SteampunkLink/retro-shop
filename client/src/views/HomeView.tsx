import { useEffect, useState } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import ProductModel from "../models/Product";
import Product from "../components/Product";

const HomeView = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    fetchProducts();
  }, []);
  return (
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
  );
};

export default HomeView;
