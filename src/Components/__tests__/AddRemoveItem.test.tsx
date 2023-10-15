import { render } from '@testing-library/react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import AddRemoveItem from '../AddRemoveItem';
import { useAppDispatch, useAppSelector } from '../../core-hooks';

const mockRemovePressed = jest.fn();
const mockAddPressed = jest.fn();

jest.mock('../../core-hooks', () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

describe('AddRemoveItem component testing', () => {
  const mockDispatch = jest.fn();
  const mockSelector = jest.fn();

  beforeAll(() => {
    (useAppSelector as jest.Mock).mockImplementation(mockSelector);
    (useAppDispatch as jest.Mock).mockImplementation(mockDispatch);
  });

  it('renders correctly', () => {
    const snap: unknown = render(
      <Provider store={store}>
        <AddRemoveItem
          quantity={30}
          addPressed={mockAddPressed}
          removePressed={mockRemovePressed}
        />
      </Provider>,
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });
});
