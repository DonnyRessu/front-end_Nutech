import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
  },
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
      console.log(JSON.stringify(state.products));
      const isExisted = state.products.filter(
        (product) => product.name === action.payload.name
      );
      console.log(isExisted);
      if (isExisted.length > 0) {
        return alert("Product already exists");
      }
      state.products[state.products.length] = isExisted[0];
      return alert("tambah produk sukses");
    },
    addProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { addProduct, addProducts } = productSlice.actions;
export default productSlice.reducer;
