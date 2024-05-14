import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { IProduct } from "../interfaces/Product";
import Product from "../components/Product";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";

const HomeView = () => {
  const { keyword, pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to={"/"} className="btn btn-light mt-2">
          Go Back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <h2>Latest Products</h2>
          <Row>
            {data.products.map((prod: IProduct) => (
              <Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={prod} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            isAdmin={false}
            keyword={keyword}
          />
        </>
      )}
    </>
  );
};

export default HomeView;
