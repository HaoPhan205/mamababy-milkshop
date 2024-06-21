import { createBrowserRouter } from "react-router-dom";
import SignIn from "../Pages/signIn/SignIn";
import SignUp from "../Pages/signUp/SignUp";
import HomePage from "../Pages/home/HomePage";
import DefaultLayout from "../Pages/defaultLayout/DefaultLayout";
import PublicRoute from "./PublicRoute";
import ShoppingCart from "../Pages/shoppingCart/ShoppingCart";
import ProductDetailPage from "../Pages/courseDetailPage/CourseDetailPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <DefaultLayout />
      </>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/product-detail/:courseId",
        element: <ProductDetailPage />,
      },
      {
        path: "/shoppingCart",
        element: <ShoppingCart />,
      },
      // {
      //   path: "/shopping",
      //   element: </>,
      // },
    ],
  },
  {
    path: "/sign-in",
    element: (
      <PublicRoute redirectTo="/">
        <SignIn />
      </PublicRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <PublicRoute redirectTo="/">
        <SignUp />
      </PublicRoute>
    ),
  },
]);
