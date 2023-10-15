import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { updateTotal } from '../Features/Cart/cartSlice';

import { ApplicationState, useAppDispatch, useAppSelector } from '../core-hooks';
import { CartItem } from './CartItem';

export type ItemProps = {
  cartItem: {
    id: number;
    quantity: number;
  };
};

const CartItems = () => {
  const { cartItems, total } = useAppSelector((state: ApplicationState) => state.cart);

  const dispatch = useAppDispatch();

  if (cartItems?.length === 0 || !cartItems) dispatch(updateTotal(0));

  return (
    <View style={styles.container}>
      <View style={{ flex: 6 }}>
        <View style={{ height: 30 }} />
        <Text style={styles.cartItems}>{`Cart Items (${cartItems?.length})`}</Text>
        <FlatList data={cartItems} renderItem={({ item }) => <CartItem cartItem={item} />} />
      </View>

      <View style={styles.cartDetails}>
        <Text style={styles.cartTotal}>Cart Total</Text>
        <Text>{total}</Text>
      </View>
    </View>
  );
};

export default CartItems;

export const styles = StyleSheet.create({
  cartDetails: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
  },
  cartItem: {
    borderWidth: 2,
    borderColor: 'black',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  cartItems: {
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartTotal: {
    width: 150,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    width: '90%',
  },
});
