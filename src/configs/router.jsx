import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/customer/HomePage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import About from "../pages/customer/About";
import CustomerLayout from "../layouts/customer";
import Shop from "../pages/customer/shop";
import ProductDetail from "../pages/customer/product-detail";

export const router = createBrowserRouter([
  {
    path: "",
    element: <CustomerLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
