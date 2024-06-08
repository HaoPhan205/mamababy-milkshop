import { RouterProvider } from "react-router-dom"
import { router } from "./Routers/router"
import { Provider } from "react-redux"
import { persistor, store } from "./Store/reduxPersist"
import { PersistGate } from "redux-persist/integration/react"


function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App