import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import RegisterUpdateProfileForm from "../components/RegisterUpdateProfileForm";
import FormContainer from "../components/FormContainer";
import { ISubmitFormArgs } from "../interfaces/Auth";

const RegisterView = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [register, { isLoading: registerLoading }] = useRegisterMutation();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async ({
    name,
    email,
    password,
    confirmPassword,
  }: ISubmitFormArgs) => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error: any) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="accent-font">Register</h1>
      <RegisterUpdateProfileForm
        userInfo={null}
        isLoading={registerLoading}
        buttonLabel={"Register"}
        handleSubmitForm={submitHandler}
      />
      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterView;
