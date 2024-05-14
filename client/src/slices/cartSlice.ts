import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartItem, ICartState } from "../interfaces/Cart";
import { ICreateAddressFields } from "../interfaces/Address";
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
    saveShippingAddress: (
      state,
      action: PayloadAction<ICreateAddressFields>
    ) => {
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
    clearAllCartData: (state) => {
      state.cartItems = [];
      state.itemsPrice = null;
      state.shippingPrice = null;
      state.taxPrice = null;
      state.totalPrice = null;
      state.shippingAddress = null;
      state.paymentMethod = "PayPal";
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
  clearAllCartData,
} = cartSlice.actions;

export default cartSlice.reducer;
