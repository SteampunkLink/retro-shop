export interface IOrderItem {
  product: string;
  name: string;
  price: number;
  qty: number;
  image: string;
}

export interface IShippingAddress {
  recipient: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface IPaymentResult {
  id: string;
  status: string;
  update_time: string;
  email_address: string;
}

export interface IOrder {
  _id: string;
  createdAt: string;
  user: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult: IPaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
}

export interface IOrderInfoAdmin {
  _id: string;
  createdAt: string;
  user: { _id: string; name: string };
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  paymentResult: IPaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  isDelivered: boolean;
  deliveredAt: string;
}
