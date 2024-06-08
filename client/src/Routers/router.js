import { Outlet, createBrowserRouter } from "react-router-dom";
import Header from '../Components/Layouts/Header/Header';
import Footer from '../Components/Layouts/Footer/Footer';
import HomePage from '../Pages/Home/HomePage';
import SignIn from '../Pages/SignIn/signin'

export const router = createBrowserRouter  ([
    {
        path: "/",
        element: (
            <>
                <Header />
                <Outlet />
                <Footer />
            </>
        ),
        children: [{
            path: "/",
            element: <HomePage />
        },
        {
            path: "/login",
            element: <SignIn />
        }
        
        ]
    },
]);
