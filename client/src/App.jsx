import React, { createContext, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { AuthProvider } from "./context/AuthContext";

export const Data = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <Data.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Data.Provider>
  );
};

export default App;
