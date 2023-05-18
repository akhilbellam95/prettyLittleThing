import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddRemoveItem from './AddRemoveItem';
import { addToCart, removeFromCart } from '../Features/Cart/cartSlice';
import { RootState } from '../store';

type ItemProps = {
  cartItem: {
    id: number;
    quantity: number;
  };
};

const Item = ({ cartItem }: ItemProps) => {
  const { products } = useSelector((state: RootState) => state.product);

  const dispatch = useDispatch();

  return (
    <View>
      {products.map(
        (product: {
          id: number;
          img: string;
          name: string;
          colour: string;
          price: number;
        }): JSX.Element | null =>
          cartItem.id === product.id ? (
            <View style={styles.cartItem}>
              <Image
                source={{ uri: product.img }}
                style={{ height: 180, width: 120, marginRight: 20 }}
              />
              <View style={{ justifyContent: 'space-between' }}>
                <View>
                  <Text style={{ maxWidth: 160 }}>{'Name: ' + product.name}</Text>
                  <Text style={{ maxWidth: 160, marginTop: 5, marginBottom: 5 }}>
                    {'Colour: ' + product.colour}
                  </Text>
                  <Text style={{ maxWidth: 160 }}>{'Price: ' + product.price}</Text>
                </View>

                <AddRemoveItem
                  style={{ marginTop: 10 }}
                  addPressed={() =>
                    dispatch(addToCart({ ...product, id: cartItem.id, quantity: 1 }))
                  }
                  removePressed={() =>
                    dispatch(removeFromCart({ ...product, id: cartItem.id, quantity: 1 }))
                  }
                  quantity={cartItem.quantity}
                />
              </View>
            </View>
          ) : null,
      )}
    </View>
  );
};

const CartItems = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const { cartItems, total } = useSelector((state: RootState) => state.cart);

  const arr = [];

  useEffect(() => {
    products.forEach((product: { id: number }) => {
      if (cartItems.find((cartItem: { id: number }) => cartItem.id === product.id)) {
        arr.push(product);
      }
    });
  }, [products]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 6 }}>
        <View style={{ height: 30 }} />
        <Text style={styles.cartItems}>{`Cart Items (${cartItems.length})`}</Text>
        <FlatList data={cartItems} renderItem={({ item }) => <Item cartItem={item} />} />
      </View>

      <View style={styles.cartDetails}>
        <Text style={styles.cartTotal}>Cart Total</Text>
        <Text>{total}</Text>
      </View>
    </View>
  );
};

export default CartItems;

const styles = StyleSheet.create({
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
