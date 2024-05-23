import { useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { saveShippingAddress } from "../../slices/cartSlice";
import {
  useGetAllAddressesQuery,
  useDeleteOneAddressMutation,
} from "../../slices/addressesApiSlice";
import { ICreateAddressFields, IAddress } from "../../interfaces/Address";
import CheckoutSteps from "../../components/CheckoutSteps";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import ErrorMessage from "../../components/ErrorMessage";

const ShippingView = () => {
  const { shippingAddress } = useAppSelector((state) => state.cart);
  const [selectedAddress, setSelectedAddress] =
    useState<ICreateAddressFields | null>(shippingAddress || null);

  const {
    data: addresses,
    isLoading: addressesLoading,
    refetch,
    error: addressesError,
  } = useGetAllAddressesQuery("");

  const [deleteAddress, { isLoading: deleteLoading }] =
    useDeleteOneAddressMutation();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const selectAddressAndContinue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(selectedAddress);
    if (selectedAddress) {
      dispatch(saveShippingAddress(selectedAddress));
      navigate("/payment");
    } else {
      toast.error("A shipping address must be selected.");
    }
  };

  const deleteHandler = async (pid: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        const response: any = await deleteAddress(pid).unwrap();
        refetch();
        toast.success(response.message);
      } catch (error: any) {
        console.log(error);
        toast.error(error.message || error.data.message);
      }
    }
  };

  return (
    <>
      {addressesLoading || deleteLoading ? (
        <Loader />
      ) : addressesError ? (
        <ErrorMessage error={addressesError} />
      ) : (
        <>
          <CheckoutSteps step1 step2 />
          <h1 className="accent-font">Shipping</h1>
          <Link className="btn btn-primary my-3" to="/address">
            Add New Address
          </Link>
          {!addresses.length ? (
            <Message variant="danger">
              <p>
                You don't have any addresses. Please add one by using the button
                above.
              </p>
            </Message>
          ) : (
            <Form onSubmit={selectAddressAndContinue}>
              <Table className="card-shadow">
                <thead>
                  <tr>
                    <th>SELECT</th>
                    <th>RECIPIENT</th>
                    <th>ADDRESS</th>
                    <th>EDIT</th>
                    <th>DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {addresses.map((addy: IAddress) => (
                    <tr key={addy._id}>
                      <td>
                        <Form.Check
                          type="radio"
                          aria-label={`${addy.recipient} - ${addy.address}, ${addy.city}`}
                          onClick={() => setSelectedAddress(addy)}
                        />
                      </td>
                      <td>{addy.recipient}</td>
                      <td>
                        {addy.address}
                        <br />
                        {addy.city}, {addy.postalCode}
                        <br />
                        {addy.country}
                      </td>
                      <td>
                        <LinkContainer to={`/address/${addy._id}`}>
                          <Button variant="light" className="btn-sm mx-2">
                            <FaEdit />
                          </Button>
                        </LinkContainer>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => deleteHandler(addy._id)}
                        >
                          <FaTrash style={{ color: "white" }} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                type="submit"
                variant="primary"
                className="mt-2"
                disabled={!selectedAddress}
              >
                Continue
              </Button>
            </Form>
          )}
        </>
      )}
    </>
  );
};

export default ShippingView;
