import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/customer/HomePage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import About from "../pages/customer/About";
import CustomerLayout from "../layouts/customer";
import Shop from "../pages/customer/shop";
import ProductDetail from "../pages/customer/product-detail";
import BlogDetail from "../pages/customer/BlogDetail";
import Profile from "../pages/customer/Profile";
import AdminLayout from "../layouts/admin";
import CustomerManagement from "../pages/admin/customer";
import FurnitureManagement from "../pages/admin/furniture";
import CategoryManagement from "../pages/admin/category";
import OrderManagement from "../pages/admin/order";

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
      {
        path: "/blog",
        element: <BlogDetail />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "customer",
        element: <CustomerManagement />,
      },
      {
        path: "furniture",
        element: <FurnitureManagement />,
      },
      {
        path: "category",
        element: <CategoryManagement />,
      },
      {
        path: "order",
        element: <OrderManagement />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
]);
