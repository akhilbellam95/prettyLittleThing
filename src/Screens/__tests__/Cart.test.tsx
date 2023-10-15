import { render } from '@testing-library/react-native';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Cart from '../Cart';
import { useAppSelector } from '../../core-hooks';

jest.mock('../../core-hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(),
}));

describe('Home component testing', () => {
  const mockSelector = jest.fn();

  beforeAll(() => {
    (useAppSelector as jest.Mock).mockImplementation(mockSelector);
  });

  it('renders correctly', () => {
    mockSelector.mockReturnValue({
      cartItems: [{ id: 1, quantity: 2 }],
    });

    const snap: unknown = render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  it('renders correctly when cart is empty', () => {
    mockSelector.mockReturnValue({
      cartItems: [],
    });

    const snap: unknown = render(
      <Provider store={store}>
        <Text>Cart is empty</Text>
      </Provider>,
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
