import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';

interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  colour: string;
}

export interface ProductsState {
  products: Product[];
}

export const productInitialState: ProductsState = {
  products: [],
};

export const productSlice = createSlice({
  name: 'product',
  initialState: productInitialState,
  reducers: {
    updateProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const getProducts = (): any => async (dispatch: AppDispatch) => {
  try {
    const res = await fetch('https://my-json-server.typicode.com/benirvingplt/products/products');
    const data = await res.json();
    dispatch(updateProducts(data));
  } catch (err) {
    console.log(err);
  }
};

export const { updateProducts } = productSlice.actions;

export default productSlice.reducer;
