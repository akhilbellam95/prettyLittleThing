import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItems from '../Components/CartItems';
import { updateTotal } from '../Features/Cart/cartSlice';
import { RootState } from '../store';

const Cart = () => {
  const { cartItems } = useSelector((state: RootState) => state.cart);
  console.log(cartItems);
  const dispatch = useDispatch();

  if (cartItems.length === 0) dispatch(updateTotal(0));

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
