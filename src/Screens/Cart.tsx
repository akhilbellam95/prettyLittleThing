import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CartItems from '../Components/CartItems';
import { ApplicationState, useAppSelector } from '../core-hooks';

const Cart = () => {
  const { cartItems } = useAppSelector((state: ApplicationState) => state.cart);

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? <CartItems /> : <Text>Cart is empty</Text>}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
