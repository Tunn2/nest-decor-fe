import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/customer/HomePage";
import Login from "../pages/auth/Login";
import Register from '../pages/auth/Register';
import About from '../pages/customer/About';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/about',
    element: <About />,
  },
]);
