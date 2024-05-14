import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import store from "./store.ts";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/bootstrap.custom.css";
import "./assets/index.css";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import HomeView from "./views/HomeView";
import ProductView from "./views/ProductView";
import CartView from "./views/CartView";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import ShippingView from "./views/User/ShippingView.tsx";
import PaymentView from "./views/User/PaymentView.tsx";
import ProfileView from "./views/User/ProfileView.tsx";
import PlaceOrderView from "./views/User/PlaceOrderView.tsx";
import OrderView from "./views/User/OrderView.tsx";
import OrderListView from "./views/Admin/OrderListView";
import SingleOrderView from "./views/Admin/SingleOrderView";
import ProductListView from "./views/Admin/ProductListView";
import SingleProductView from "./views/Admin/SingleProductView";
import UserListView from "./views/Admin/UserListView";
import SingleUserView from "./views/Admin/SingleUserView";
import CreateAddressView from "./views/User/CreateAddressView.tsx";
import UpdateAddressView from "./views/User/UpdateAddressView.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeView />} />
      <Route path="/search/:keyword" element={<HomeView />} />
      <Route path="/page/:pageNumber" element={<HomeView />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<HomeView />} />
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
        <Route path="/address" element={<CreateAddressView />} />
        <Route path="/address/:id" element={<UpdateAddressView />} />
      </Route>

      <Route path="/" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListView />} />
        <Route path="/admin/order/:id" element={<SingleOrderView />} />
        <Route path="/admin/productlist" element={<ProductListView />} />
        <Route
          path="/admin/productlist/:pageNumber"
          element={<ProductListView />}
        />
        <Route path="/admin/product/:id" element={<SingleProductView />} />
        <Route path="/admin/userlist" element={<UserListView />} />
        <Route path="/admin/user/:id" element={<SingleUserView />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
