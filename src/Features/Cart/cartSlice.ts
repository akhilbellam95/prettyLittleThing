import { createSlice } from '@reduxjs/toolkit';

type CartItem = {
  id: number;
  quantity: number;
};

const initialState = {
  cartItems: [] as CartItem[],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, price } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ id, quantity: 1 });
      }
      state.total += price;
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((el) => el.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        if (item.quantity === 1) {
          state.cartItems.splice(itemIndex, 1);
        } else {
          item.quantity--;
        }
        state.total -= action.payload.price;
      }
    },
    updateTotal: (state, action) => {
      state.total = action.payload;
    }
  },
});

export const { addToCart, removeFromCart, updateTotal } = cartSlice.actions;

export default cartSlice.reducer;
