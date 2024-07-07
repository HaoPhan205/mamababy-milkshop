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
import PaymentForm from "../Components/vnpay/PaymentForm";

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
        path: "/chi-tiet-san-pham/:productItemId",
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
        path: "/quan-li-san-pham",
        element: <CreateNewProduct />,
      },
      {
        path: "/quan-li-giao-hang",
        element: <CreateNewProduct />,
      },
      {
        path: "/dashboard-admin",
        element: <CreateNewProduct />,
      },
      {
        path: "/dashboard-staff",
        element: <CreateNewProduct />,
      },
      {
        path: "/payment",
        element: <PaymentForm />,
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
