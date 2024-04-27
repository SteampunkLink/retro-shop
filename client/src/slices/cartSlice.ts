import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, ICartState, IShippingAddress } from "../interfaces/Cart";
import { updateCart } from "../utils/cartUtils";

const initialState: ICartState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart")!)
  : { cartItems: [], shippingAddress: null, paymentMethod: "PayPal" };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const item = action.payload;
      const existItem = state.cartItems.find((i) => i.prodId === item.prodId);
      if (existItem) {
        const updatedCartItems = state.cartItems.map((i) =>
          i.prodId === existItem.prodId ? item : i
        );
        state.cartItems = updatedCartItems;
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      return updateCart(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.prodId !== action.payload
      );
      return updateCart(state);
    },
    saveShippingAddress: (state, action: PayloadAction<IShippingAddress>) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action: PayloadAction<string>) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];
      return updateCart(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
