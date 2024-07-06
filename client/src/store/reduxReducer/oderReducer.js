import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk để fetch đơn hàng từ API
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (userId) => {
    const response = await fetch(`/api/orders?userId=${userId}`);
    const data = await response.json();
    return data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
