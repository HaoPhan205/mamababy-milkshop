import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// Load cart from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {
        products: [],
        totalQuantity: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      products: [],
      totalQuantity: 0,
    };
  }
};

// Save cart to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

const initialState = loadState();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products?.find(
        (item) => item.productItemId === action.payload.productItemId
      );
      if (item) {
        item.quantity += action.payload.quantity || 1;
      } else {
        state.products.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      state.totalQuantity = state.products.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      saveState(state);
      toast.success("Product added to cart");
    },

    updateQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.productItemId === action.payload.productItemId
      );
      if (item) {
        item.quantity = action.payload.quantity;
        state.totalQuantity = state.products.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        saveState(state); // Save state to localStorage
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.productItemId === action.payload.productItemId
      );
      if (item) {
        item.quantity++;
        state.totalQuantity = state.products.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        saveState(state); // Save state to localStorage
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item.productItemId === action.payload.productItemId
      );
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
          state.totalQuantity = state.products.reduce(
            (acc, item) => acc + item.quantity,
            0
          );
        }
        saveState(state); // Save state to localStorage
      }
    },

    deleteItem: (state, action) => {
      const item = state.products.find(
        (item) => item.productItemId === action.payload
      );
      if (item) {
        state.products = state.products.filter(
          (item) => item.productItemId !== action.payload
        );
        state.totalQuantity = state.products.reduce(
          (acc, item) => acc + item.quantity,
          0
        );
        saveState(state); // Save state to localStorage
      }
    },

    deleteSelectedItems: (state, action) => {
      const selectedIds = action.payload;
      state.products = state.products.filter(
        (item) => !selectedIds.includes(item.productItemId)
      );
      state.totalQuantity = state.products.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      saveState(state); // Save state to localStorage
    },

    resetCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
      saveState(state); // Save state to localStorage
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  deleteItem,
  resetCart,
  deleteSelectedItems,
} = cartSlice.actions;
export default cartSlice.reducer;
