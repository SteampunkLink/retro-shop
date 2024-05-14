import { Table, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useUpdateProfileMutation } from "../../slices/usersApiSlice";
import { useGetMyOrdersQuery } from "../../slices/ordersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import RegisterUpdateProfileForm from "../../components/RegisterUpdateProfileForm";
import { ISubmitFormArgs } from "../../interfaces/Auth";
import ErrorMessage from "../../components/ErrorMessage";
import Loader from "../../components/Loader";
import { IOrder } from "../../interfaces/Order";

const ProfileView = () => {
  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector((state) => state.auth);

  const [updateProfile, { isLoading: profileLoading }] =
    useUpdateProfileMutation();

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetMyOrdersQuery("");

  const submitHandler = async (formFields: ISubmitFormArgs) => {
    console.log(formFields);
    if (formFields.password !== formFields.confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo?._id,
          name: formFields.name,
          email: formFields.email,
          password: formFields.password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated!");
      } catch (error: any) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          <RegisterUpdateProfileForm
            userInfo={userInfo}
            isLoading={profileLoading}
            buttonLabel={"Update"}
            handleSubmitForm={submitHandler}
          />
        </Col>
        <Col md={9}>
          <h2>Orders</h2>
          {ordersLoading ? (
            <Loader />
          ) : ordersError ? (
            <ErrorMessage error={ordersError} />
          ) : (
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o: IOrder) => (
                  <tr key={o._id}>
                    <td>{o._id}</td>
                    <td>{o.createdAt.substring(0, 10)}</td>
                    <td>${o.totalPrice}</td>
                    <td>
                      {o.isPaid ? (
                        o.paidAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      {o.isDelivered ? (
                        o.deliveredAt.substring(0, 10)
                      ) : (
                        <FaTimes style={{ color: "red" }} />
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/myorders/${o._id}`}>
                        <Button className="btn-sm" variant="light">
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  );
};

export default ProfileView;
