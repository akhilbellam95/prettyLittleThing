// eslint-disable-next-line prettier/prettier
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Features/Cart/cartSlice';
import productReducer from './Features/Product/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
