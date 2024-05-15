import { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout } from "../slices/authSlice";

const ErrorMessage = (err: any) => {
  const [errMsg, setErrMsg] = useState(
    err.data?.message ||
      err.error?.data?.message ||
      "An error has occured - DEFAULT"
  );
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (typeof err === "string") {
      setErrMsg(err);
    }
    if (errMsg === "You need to be logged in to view." && !!userInfo) {
      toast("Your session has expired. Please log in again.");
      dispatch(logout());
    }
  }, []);
  return <Alert variant="danger">{errMsg}</Alert>;
};

export default ErrorMessage;
