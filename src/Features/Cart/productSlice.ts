import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '../../store';

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'product',
  initialState,
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

export const { updateProducts } = cartSlice.actions;

export default cartSlice.reducer;
