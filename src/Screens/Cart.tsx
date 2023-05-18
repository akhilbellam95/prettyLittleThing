import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import CartItems from '../Components/CartItems';
import { RootState } from '../store';

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

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
