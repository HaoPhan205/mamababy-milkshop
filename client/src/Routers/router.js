import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from '../Components/Layouts/header/Header';
import Footer from '../Components/Layouts/footer/Footer';
import SignIn from "../Pages/signIn/SignIn";
import SignUp from "../Pages/signUp/SignUp";
import HomePage from "../Pages/home/HomePage"
import DefaultLayout from "../Pages/defaultLayout/DefaultLayout";

export const router = createBrowserRouter  ([
    {
        path: "/",
        element: (
             <>
        <DefaultLayout />
      </>
        ),
        children: [{
            path: "/",
            element: <HomePage/>
        },
       
        
        ]
    },
    {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
]);
