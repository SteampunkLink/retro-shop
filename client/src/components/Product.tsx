import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces/Product";
import Rating from "./Rating";

interface IProductProps {
  product: IProduct;
}

const Product = ({ product }: IProductProps) => {
  return (
    <Card className="my-3 p-3 rounded card-shadow">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
