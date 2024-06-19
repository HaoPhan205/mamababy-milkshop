import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import adminReducer from "./reduxReducer/adminReducer";
import authReducer from "./reduxReducer/authReducer";

const rootPersistConfig = {
  key: "root",
  storage,
  blacklist: ["auth"],
};

const authPersistConfig = {
  key: "auth",
  storage,
};

const rootReducer = combineReducers({
  admin: adminReducer,
  auth: persistReducer(authPersistConfig, authReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
