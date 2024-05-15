// import { Button } from "react-bootstrap";
import { PayPalButtons } from "@paypal/react-paypal-js";
import {
  OnApproveData,
  OnApproveActions,
  CreateOrderData,
  CreateOrderActions,
} from "@paypal/paypal-js/types/components/buttons";
import { usePayOrderMutation } from "../../slices/ordersApiSlice";
import { toast } from "react-toastify";
import Loader from "../Loader";

interface IPayPalParams {
  orderId: string | undefined;
  refetch: () => void;
  payValue: string;
}

const PayPalControls = ({ orderId, refetch, payValue }: IPayPalParams) => {
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const onApprove = async (_data: OnApproveData, actions: OnApproveActions) => {
    try {
      const details = await actions.order?.capture();
      await payOrder({ orderId, details }).unwrap();
      refetch();
      toast("Payment successful");
    } catch (error: any) {
      toast.error(error.data.message || error.message);
    }
  };

  const onError = (err: any) => {
    toast(err.message);
  };

  const createOrder = async (
    _data: CreateOrderData,
    actions: CreateOrderActions
  ) => {
    const oid = await actions.order.create({
      purchase_units: [
        {
          amount: { value: payValue, currency_code: "USD" },
        },
      ],
      intent: "CAPTURE",
    });
    return oid;
  };

  return loadingPay ? (
    <Loader />
  ) : (
    <>
      <div>
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </div>
    </>
  );
};

export default PayPalControls;
