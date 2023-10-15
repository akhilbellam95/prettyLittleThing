import { configureStore } from '@reduxjs/toolkit';
import productReducer, { updateProducts } from '../productSlice';
import { mockProducts } from '../../../mocks/data';

describe('cartSlice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        product: productReducer,
      },
    });
  });

  it('should add product to cart', () => {
    const product = mockProducts;
    store.dispatch(updateProducts(product));
    const state = store.getState()['product'];
    expect(state.products).toHaveLength(mockProducts.length);
  });

});