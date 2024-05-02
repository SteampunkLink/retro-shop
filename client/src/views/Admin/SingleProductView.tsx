import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import {
  useUpdateProductMutation,
  useGetOneProductQuery,
  useUploadProductImageMutation,
} from "../../slices/productsApiSlice";

const SingleProductView = () => {
  const { id: prodId } = useParams();

  const {
    data: product,
    isLoading: prodLoading,
    error: prodError,
  } = useGetOneProductQuery(prodId);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [tags, setTags] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const [uploadProductImage, { isLoading: imageLoading }] =
    useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setTags(product.tags.join(", "));
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFields = {
      name,
      price,
      image,
      brand,
      tags,
      countInStock,
      description,
    };
    const result: any = await updateProduct({ prodId, updatedFields });

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product updated");
      navigate("/admin/productlist");
    }
  };

  const uploadFileHandler = async (e: React.ChangeEvent<any>) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error: any) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-dark my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateLoading ? <Loader /> : <></>}
        {imageLoading ? <Loader /> : <></>}
        {prodLoading ? (
          <Loader />
        ) : prodError ? (
          <ErrorMessage error={prodError} />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="my-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="my-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.Control type="file" onChange={uploadFileHandler} />
            </Form.Group>

            <Form.Group controlId="brand" className="my-3">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                placeholder="Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="tags" className="my-3">
              <Form.Label>Tags (separate with commas)</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Tag1, Tag2, etc."
                value={tags}
                rows={2}
                onChange={(e) => setTags(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-3">
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(Number(e.target.value))}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="my-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter description"
                value={description}
                rows={2}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default SingleProductView;
