import React, { createContext, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { useStorage } from "./Services/Hooks/useStorage";
import store from "./store/store";
import { Provider } from "react-redux";

export const Data = createContext(null);

function App() {
  const { getFromStorage } = useStorage();
  const [user, setUser] = useState(
    getFromStorage("user") ? getFromStorage("user") : null
  );
  console.log(user);

  return (
    <Provider store={store}>
      <Data.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </Data.Provider>
    </Provider>
  );
}

export default App;
