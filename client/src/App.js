import React, { createContext, useState } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers/router";
import { Provider } from "react-redux";
import { persistor, store } from "./Store/reduxPersist";
import { PersistGate } from "redux-persist/integration/react";
import { useStorage } from "./Hooks/useStorage";
import "./App.scss";

export const Data = createContext(null);
function App() {
  const { getFromStorage } = useStorage();
  const [user, setUser] = useState(
    getFromStorage("user") ? getFromStorage("user") : null
  );
  console.log(user);

  return (
    <>
      <Data.Provider value={{ user, setUser }}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Data.Provider>
    </>
  );
}

export default App;
