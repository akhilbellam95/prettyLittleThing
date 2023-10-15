import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { useAppDispatch, useAppSelector } from '../../core-hooks';
import { CartItem } from '../CartItem';
import { addToCart } from '../../Features/Cart/cartSlice';
import { mockProducts } from '../../mocks/data';

jest.mock('../../core-hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe('CartItem component testing', () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();

  beforeAll(() => {
    (useAppSelector as jest.Mock).mockImplementation(mockSelector);
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  const snap: unknown = render(
    <Provider store={store}>
      <CartItem cartItem={{ id: 1, quantity: 1 }} />
    </Provider>,
  ).toJSON();

  beforeEach(() => {
    mockSelector.mockReturnValue({
      products: mockProducts,
    });
  });

  it('renders correctly', () => {
    expect(snap).toMatchSnapshot();
  });

  it('should add product to cart', () => {
    const product = { id: 1 };
    store.dispatch(addToCart(product));
    const state = store.getState()['cart'];
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0]).toEqual({ ...product, quantity: 1 });

    expect(snap).toMatchSnapshot();
  });

  it('should call when user press add button', () => {
    const { getByTestId } = render(<CartItem cartItem={{ id: 1, quantity: 1 }} />);
    const addButton = getByTestId('add-btn');

    fireEvent.press(addButton);
  });

  it('should call when user press remove button', () => {
    const { getByTestId } = render(<CartItem cartItem={{ id: 1, quantity: 1 }} />);
    const removeButton = getByTestId('remove-btn');

    fireEvent.press(removeButton);
  });

  // it('should remove product from cart', () => {
  //   const product = { id: 1 };
  //   store.dispatch(addToCart(product));
  //   store.dispatch(removeFromCart(product));
  //   const state = store.getState()['cart'];
  //   expect(state.cartItems).toHaveLength(0);
  // });
});
