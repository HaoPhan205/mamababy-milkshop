import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./reduxReducer/cartSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
  },
});
export default store;
