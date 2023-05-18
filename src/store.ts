// eslint-disable-next-line prettier/prettier
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Features/Cart/cartSlice';
import productReducer from './Features/Cart/productSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
