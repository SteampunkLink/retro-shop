import CartItemModel from "./CartItem";

export default interface ICartState {
  cartItems: CartItemModel[];
  itemsPrice: string | null;
  shippingPrice: string | null;
  taxPrice: string | null;
  totalPrice: string | null;
}
