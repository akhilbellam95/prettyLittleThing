import { createSlice } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  quantity: number;
};

export interface CartState {
  cartItems: CartItem[],
  total: number
}

export const cartInitialState: CartState = {
  cartItems: [] as CartItem[],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: cartInitialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      let total = state.total;
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ id, quantity: 1 });
      }
      total += action.payload.price;
      state.total = parseFloat(total.toFixed(2));
    },
    removeFromCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((el) => el.id === action.payload.id);
      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        let total = state.total;
        if (item.quantity === 1) {
          state.cartItems.splice(itemIndex, 1);
        } else {
          item.quantity--;
        }
        total -= action.payload.price;
        state.total = parseFloat(total.toFixed(2));
      }
    },
    updateTotal: (state, action) => {
      state.total = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateTotal } = cartSlice.actions;

export default cartSlice.reducer;
