import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/customer/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);
