import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { addToCart, removeFromCart } from '../cartSlice';

describe('cartSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        cart: cartReducer,
      },
    });
  });

  it('should add product to cart', () => {
    const product = { id: 1 };
    store.dispatch(addToCart(product));
    const state = store.getState()['cart'];
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0]).toEqual({ ...product, quantity: 1 });
  });

  it('should remove product from cart', () => {
    const product = { id: 1, name: 'Product 1', price: 10 };
    store.dispatch(addToCart(product));
    store.dispatch(removeFromCart(product));
    const state = store.getState()['cart'];
    expect(state.cartItems).toHaveLength(0);
  });
});