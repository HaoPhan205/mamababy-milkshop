import { createBrowserRouter } from "react-router-dom";
import SignIn from "../Pages/signIn/SignIn";
import SignUp from "../Pages/signUp/SignUp";
import HomePage from "../Pages/home/HomePage";
import DefaultLayout from "../Pages/defaultLayout/DefaultLayout";
import PublicRoute from "./PublicRoute";
import ShoppingCart from "../Pages/shoppingCart/ShoppingCart";
import ProductDetailPage from "../Pages/productDetailPage/productDetailPage";
import Shopping from "../Pages/searchResult/SearchResultPage";
import CreateNewProduct from "../Pages/Staff/createProductPage/CreateProductsPage";
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
      {
        path: "/cua-hang",
        element: <Shopping />,
      },
      {
        path: "/tao-san-pham",
        element: <CreateNewProduct />,
      },
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
