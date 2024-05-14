import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddressForm from "../../components/AddressForm";
import { ICreateAddressFields } from "../../interfaces/Address";
import {
  useGetOneAddressQuery,
  useUpdateOneAddressMutation,
} from "../../slices/addressesApiSlice";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";

const UpdateAddressView = () => {
  const { id: addressId } = useParams();
  const {
    data: returnedAddress,
    isLoading: addressLoading,
    error: addressError,
  } = useGetOneAddressQuery(addressId);

  const [updateAddress, { isLoading: updateLoading }] =
    useUpdateOneAddressMutation();

  const navigate = useNavigate();

  const handleUpdateAddress = async (fields: ICreateAddressFields) => {
    try {
      const result: any = await updateAddress({ addressId, fields }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Address Updated");
        navigate("/shipping");
      }
    } catch (error: any) {
      toast.error(error.data.message || error.error);
    }
  };
  return (
    <div>
      <h1>Edit Address</h1>
      {addressError ? (
        <ErrorMessage error={addressError} />
      ) : addressLoading || updateLoading ? (
        <Loader />
      ) : (
        <AddressForm
          handleSubmit={handleUpdateAddress}
          shippingAddress={returnedAddress}
        />
      )}
    </div>
  );
};

export default UpdateAddressView;
