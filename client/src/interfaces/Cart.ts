export interface ICartItem {
  prodId: string;
  name: string;
  subheading: string;
  image: string;
  description: string;
  brand: string;
  price: number;
  countInStock: number;
  qty: number;
}

export interface ICartState {
  cartItems: ICartItem[];
  itemsPrice: string | null;
  shippingPrice: string | null;
  taxPrice: string | null;
  totalPrice: string | null;
}
