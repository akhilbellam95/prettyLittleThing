import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import Products from '../Products';
import { useAppDispatch, useAppSelector } from '../../core-hooks';
import { mockCartItems, mockProducts } from '../../mocks/data';
import { act } from 'react-test-renderer';
import { store } from '../../store';

jest.mock('../../core-hooks', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

describe('Products component testing', () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();

  beforeAll(() => {
    (useAppSelector as jest.Mock).mockImplementation(mockSelector);
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
  });

  beforeEach(() => {
    mockSelector.mockReturnValue({
      products: mockProducts,
      cartItems: mockCartItems,
    });
  });

  it('renders correctly', () => {
    const snap: unknown = render(
      <Provider store={store}>
        <Products />
      </Provider>,
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
