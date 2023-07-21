import { createSlice } from "@reduxjs/toolkit";
import dummyData from "../../dummyData";

const productSlice = createSlice({
  name: "Product",
  initialState: {
    products: dummyData,
  },
  reducers: {
    addProduct: (state, action) => {
      const isExisted = state.products.filter(
        (product) => product.name === action.payload.name
      );

      if (isExisted.length > 0) {
        return alert("Product already exists");
      }
      state.products[state.products.length] = action.payload;
      return alert("tambah produk sukses");
    },
    addProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item.name !== action.payload.name
      );
    },
    updateProduct: (state, action) => {
        const indexProduct = state.products.findIndex(
            (item) => item.name === action.payload.name
        )
        state.products[indexProduct] = action.payload;
    }
  },
});

export const { addProduct, addProducts, deleteProduct, updateProduct } = productSlice.actions;
export default productSlice.reducer;
