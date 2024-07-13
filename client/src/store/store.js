import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import cartSlice from "./reduxReducer/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartSlice,
  },
});
export default store;
