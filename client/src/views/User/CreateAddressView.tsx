import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AddressForm from "../../components/AddressForm";
import { ICreateAddressFields } from "../../interfaces/Address";
import { useCreateAddressMutation } from "../../slices/addressesApiSlice";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";

const CreateAddressView = () => {
  const [createAddress, { isLoading }] = useCreateAddressMutation();
  const navigate = useNavigate();

  const createNewAddress = async (fields: ICreateAddressFields) => {
    try {
      const result: any = await createAddress(fields);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Address Added");
        navigate("/shipping");
      }
    } catch (error: any) {
      toast.error(error.data.message || error.error);
    }
  };
  return (
    <FormContainer>
      <h1 className="accent-font">Add New Address</h1>
      {isLoading ? <Loader /> : <AddressForm handleSubmit={createNewAddress} />}
    </FormContainer>
  );
};

export default CreateAddressView;
