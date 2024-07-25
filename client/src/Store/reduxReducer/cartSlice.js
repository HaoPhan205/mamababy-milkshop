import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return {
        products: [],
        totalQuantity: 0,
        selectedItems: [],
        selectAll: false,
        totalPrice: 0,
        totalDiscount: 0,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      products: [],
      totalQuantity: 0,
      selectedItems: [],
      selectAll: false,
      totalPrice: 0,
      totalDiscount: 0,
    };
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (err) {}
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
        saveState(state);
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
        saveState(state);
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
        saveState(state);
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
        state.selectAll = false;
        saveState(state);
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
      state.selectAll = false;
      saveState(state);
    },

    resetCart: (state) => {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.totalDiscount = 0;
      state.selectedItems = [];
      saveState(state);
    },

    toggleSelectAll: (state) => {
      if (state.selectAll) {
        state.selectedItems = [];
      } else {
        state.selectedItems = state.products.map((item) => item.productItemId);
      }
      state.selectAll = !state.selectAll;
      saveState(state);
    },

    toggleItemSelection: (state, action) => {
      const { productItemId } = action.payload;
      if (state.selectedItems.includes(productItemId)) {
        state.selectedItems = state.selectedItems.filter(
          (id) => id !== productItemId
        );
      } else {
        state.selectedItems.push(productItemId);
      }
      if (state.selectedItems.length === state.products.length) {
        state.selectAll = true;
      } else {
        state.selectAll = false;
      }
      saveState(state);
    },

    setTotalInfo: (state, action) => {
      state.totalPrice = action.payload.total;
      state.totalDiscount = action.payload.discount;
    },

    setSelectedItems(state, action) {
      state.selectedItems = action.payload;
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
  toggleSelectAll,
  toggleItemSelection,
  setTotalInfo,
  setSelectedItems,
} = cartSlice.actions;
export default cartSlice.reducer;
