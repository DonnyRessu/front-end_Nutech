import { configureStore } from "@reduxjs/toolkit";
import productReducers from "./reducer/product";

export const store = configureStore({
  reducer: {
    product: productReducers,
  },
});
