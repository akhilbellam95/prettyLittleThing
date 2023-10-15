import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';
import Home from '../Home';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { act } from 'react-test-renderer';

const mockedNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({ navigate: mockedNavigation }),
}));

const navigation = { navigate: jest.fn() };

describe('Home component testing', () => {
  const tree = (
    <Provider store={store}>
      <Home />
    </Provider>
  );

  it('renders correctly', () => {
    const snap: unknown = render(
      <Provider store={store}>
        <Home />
      </Provider>,
    ).toJSON();
    expect(snap).toMatchSnapshot();
  });

  test('When user clisk on Go to cart', async () => {
    const { getByTestId } = render(tree);

    await act(() => {
      fireEvent.press(getByTestId('go-to-cart'));

      expect(navigation.navigate).toBeTruthy();
    });
  });
});
