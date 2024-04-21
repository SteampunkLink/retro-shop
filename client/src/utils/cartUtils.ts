import ICartState from "../models/CartState";

export const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state: ICartState) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, i) => acc + i.price * i.qty, 0)
  );
  // Calculate shipping price
  state.shippingPrice = addDecimals(Number(state.itemsPrice) > 100 ? 0 : 10);
  // Calculate tax price
  state.taxPrice = addDecimals(Number(state.itemsPrice) * 0.15);
  // Calculate total price
  state.totalPrice = addDecimals(
    Number(state.itemsPrice) +
      Number(state.shippingPrice) +
      Number(state.taxPrice)
  );
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
