import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store.ts";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/bootstrap.custom.css";
import "./assets/index.css";
import PrivateRoute from "./components/PrivateRoute.tsx";
import HomeView from "./views/HomeView.tsx";
import ProductView from "./views/ProductView.tsx";
import CartView from "./views/CartView.tsx";
import LoginView from "./views/LoginView.tsx";
import RegisterView from "./views/RegisterView.tsx";
import ShippingView from "./views/ShippingView.tsx";
import PaymentView from "./views/PaymentView.tsx";
import ProfileView from "./views/ProfileView.tsx";
import PlaceOrderView from "./views/PlaceOrderView.tsx";
import OrderView from "./views/OrderView.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeView />} />
      <Route path="/product/:id" element={<ProductView />} />
      <Route path="/cart" element={<CartView />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/register" element={<RegisterView />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingView />} />
        <Route path="/payment" element={<PaymentView />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/placeorder" element={<PlaceOrderView />} />
        <Route path="/myorders/:id" element={<OrderView />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
