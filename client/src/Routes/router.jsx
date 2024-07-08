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
import AdminPage from "../Pages/Admin/admin";
import Donhang from "../Pages/donhang/donhang";
import PageError from "../Pages/PageError/PageError";

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
        path: "//don-hang-cua-ban",
        element: <Donhang />,
      },

      {
        path: "/chinh-sach-bao-mat",
        element: <PageError />,
      },
      {
        path: "/dieu-khoan-chung",
        element: <PageError />,
      },
      {
        path: "/chinh-sach-giao-hang",
        element: <PageError />,
      },
      {
        path: "/chinh-sach-thanh-toan",
        element: <PageError />,
      },
      {
        path: "/chinh-sach-bao-hanh",
        element: <PageError />,
      },
      {
        path: "/chinh-sach-doi-tra-hang",
        element: <PageError />,
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
  {
    path: "/adminPage",
    element: <AdminPage />,
    children: [
      {
        path: "/adminPage/quan-li-san-pham",
        element: <CreateNewProduct />,
      },
      {
        path: "/adminPage/quan-li-giao-hang",
        element: <CreateNewProduct />,
      },
      {
        path: "/adminPage/dashboard-admin",
        element: <CreateNewProduct />,
      },
      {
        path: "/adminPage/dashboard-staff",
        element: <CreateNewProduct />,
      },
    ],
  },
]);
