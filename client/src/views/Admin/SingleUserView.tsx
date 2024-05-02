import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";

const SingleUserView = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: isUpdateLoading }] = useUpdateUserMutation();
  const navigate = useNavigate();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFields = { name, email };
    try {
      await updateUser({ userId, updatedFields });
      toast.success("user updated successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  return (
    <>
      <Link to="admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {isUpdateLoading ? <Loader /> : <></>}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage error={error} />
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default SingleUserView;
