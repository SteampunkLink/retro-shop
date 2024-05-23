import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import { IProduct } from "../interfaces/Product";

const ProductCarousel = () => {
  const {
    data: productsInCarousel,
    isLoading,
    error,
  } = useGetTopProductsQuery("");

  return isLoading ? (
    <Loader />
  ) : error ? (
    <ErrorMessage error={error} />
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4 card-shadow">
      {productsInCarousel.map((prod: IProduct) => (
        <Carousel.Item
          key={prod._id}
          className="main-carousel"
          style={{
            background: `url(${prod.image})`,
          }}
        >
          <div className="main-carousel-gel">
            <Link to={`/product/${prod._id}`}>
              <Image
                src={prod.image}
                alt={prod.name}
                fluid
                style={{
                  maxHeight: "40vh",
                  minWidth: "500px",
                  objectFit: "cover",
                  overflow: "hidden",
                }}
              />
              <Carousel.Caption>
                <h2>
                  {prod.name} ${prod.price}
                </h2>
              </Carousel.Caption>
            </Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
