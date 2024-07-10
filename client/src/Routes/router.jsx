import { createBrowserRouter } from "react-router-dom";
import SignIn from "../Pages/signIn/SignIn";
import SignUp from "../Pages/signUp/SignUp";
import HomePage from "../Pages/home/HomePage";
import DefaultLayout from "../Pages/defaultLayout/DefaultLayout";

import ShoppingCart from "../Pages/shoppingCart/ShoppingCart";
import ProductDetailPage from "../Pages/productDetailPage/productDetailPage";
import Shopping from "../Pages/searchResult/SearchResultPage";
import CreateNewProduct from "../Pages/Staff/createProductPage/CreateProductsPage";
import StaffPage from "../Pages/Staff/staffPage";
import AdminPage from "../Pages/Admin/admin";
import Donhang from "../Pages/donhang/donhang";
import PageError from "../Pages/PageError/PageError";

import Staff from "../Pages/Admin/quanlinhanvien/staff";
import Sanpham from "../Pages/Admin/donhang/sanpham";
import ProtectedRoute from "./ProtectedRoute";

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
        path: "/don-hang-cua-ban",
        element: <Donhang />,
      },

      {
        path: "/chinh-sach-bao-mat",
        element: <PageError />,
      },

      {
        path: "/gioi-thieu",
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
    path: "/404",
    element: <PageError />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },

  {
    path: "/adminPage",
    element: <AdminPage />,
  },
  {
    path: "/adminPage/quan-li-san-pham",
    element: <Sanpham />,
  },
  {
    path: "/adminPage/quan-li-don-hang",
    element: <CreateNewProduct />,
  },
  {
    path: "/adminPage/quan-li-nhan-vien",
    element: <Staff />,
  },
  {
    path: "/adminPage/doanh-thu-cua-hang",
    element: <CreateNewProduct />,
  },

  {
    path: "/staffPage",
    element: <StaffPage />,
  },
]);
