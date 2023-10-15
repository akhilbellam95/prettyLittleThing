import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import Products from '../Products';
import { useAppDispatch, useAppSelector } from '../../core-hooks';
import { mockCartItems, mockProducts } from '../../mocks/data';
import { act } from 'react-test-renderer';
import { store } from '../../store';
import { addToCart } from '../../Features/Cart/cartSlice';
import { ProductItem } from '../ProductItem';

jest.mock('../../core-hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('ProductItem component testing', () => {
  // let store;
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();
  const tree = (
    <Provider store={store}>
      <ProductItem product={mockProducts[0]} />
    </Provider>
  );

  beforeAll(() => {
    (useAppSelector as jest.Mock).mockImplementation(mockSelector);
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  beforeEach(() => {
    mockSelector.mockReturnValue({
      product: mockProducts,
      cartItems: [],
    });
  });

  it('renders correctly', () => {
    const snap: unknown = render(tree).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('should add product to cart', () => {
    const product = { id: 1 };
    store.dispatch(addToCart(product));
    const state = store.getState()['cart'];
    expect(state.cartItems).toHaveLength(1);
    expect(state.cartItems[0]).toEqual({ ...product, quantity: 1 });

    const snap: unknown = render(tree).toJSON();
    expect(snap).toMatchSnapshot();
  });

  test('should call when user press Add to cart button', async () => {
    const { getByTestId } = render(tree);

    await act(() => {
      fireEvent.press(getByTestId('add-to-cart'));
    });
  });

  test('should call when user press add button', async () => {
    mockSelector.mockReturnValue({
      cartItems: mockCartItems,
    });
    const { getByTestId } = render(tree);

    await act(() => {
      fireEvent.press(getByTestId('add-btn'));
    });
  });

  test('should call when user press remove button', async () => {
    mockSelector.mockReturnValue({
      cartItems: mockCartItems,
    });
    const { getByTestId } = render(tree);

    await act(() => {
      fireEvent.press(getByTestId('remove-btn'));
    });
  });
});
