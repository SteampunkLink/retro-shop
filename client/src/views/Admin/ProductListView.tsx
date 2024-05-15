import { Table, Row, Col, Button } from "react-bootstrap";
import {
  FaTrash,
  FaEdit,
  FaPlus,
  FaToggleOff,
  FaToggleOn,
} from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import Paginate from "../../components/Paginate";
import {
  useGetAdminProductListQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdatePublishStatusMutation,
} from "../../slices/productsApiSlice";
import { IProduct } from "../../interfaces/Product";
import { toast } from "react-toastify";

const ProductListView = () => {
  const pageNumber = useParams();
  const {
    data,
    isLoading: isProdLoading,
    refetch,
    error,
  } = useGetAdminProductListQuery(pageNumber);

  const [createProduct, { isLoading: isCreateLoading }] =
    useCreateProductMutation();

  const [updatePublishStatus, { isLoading: isPubStatusLoading }] =
    useUpdatePublishStatusMutation();

  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  const createProductHandler = async () => {
    try {
      await createProduct(pageNumber);
      refetch();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const togglePublishHandler = async (pid: string, isPub: boolean) => {
    const warningMessage = isPub
      ? "Are you sure you want to unpublish? (Product will no longer appear on the site.)"
      : "Are you sure you want to publish? (Product will be visible on site.)";
    if (window.confirm(warningMessage)) {
      try {
        await updatePublishStatus(pid);
        refetch();
        toast.success("Product status updated!");
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  const deleteHandler = async (pid: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response: any = await deleteProduct(pid).unwrap();
        refetch();
        toast.success(response.message);
      } catch (err: any) {
        toast.error(err.message);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={createProductHandler}>
            <FaPlus /> Create Product
          </Button>
        </Col>
      </Row>
      {isCreateLoading && <Loader />}
      {isPubStatusLoading && <Loader />}
      {isDeleteLoading && <Loader />}

      {isProdLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage error={error} />
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>NAME</th>
                <th>PRICE</th>
                <th>TAGS</th>
                <th>PUBLISHED?</th>
                <th># IN STOCK</th>
                <th>EDIT</th>
                <th>DELETE</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((prod: IProduct) => (
                <tr key={prod._id}>
                  <td>{prod.name}</td>
                  <td>${prod.price}</td>
                  <td>{prod.tags.join(", ")}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() =>
                        togglePublishHandler(prod._id, prod.isPublished)
                      }
                    >
                      {prod.isPublished ? (
                        <FaToggleOn style={{ color: "green" }} />
                      ) : (
                        <FaToggleOff style={{ color: "red" }} />
                      )}
                    </Button>
                  </td>
                  <td>{prod.countInStock}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${prod._id}`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(prod._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate page={data.page} pages={data.pages} isAdmin={true} />
        </>
      )}
    </>
  );
};

export default ProductListView;
