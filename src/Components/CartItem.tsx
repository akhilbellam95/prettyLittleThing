import React from 'react';
import { Image, Text, View } from 'react-native';
import { addToCart, removeFromCart } from '../Features/Cart/cartSlice';
import AddRemoveItem from './AddRemoveItem';
import { ApplicationState, useAppDispatch, useAppSelector } from '../core-hooks';
import { ItemProps, styles } from './CartItems';

export const CartItem = ({ cartItem }: ItemProps) => {
  const { products } = useAppSelector((state: ApplicationState) => state.product) || [];

  const dispatch = useAppDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart({ ...product, id: cartItem.id, quantity: 1 }));
  };

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart({ ...product, id: cartItem.id, quantity: 1 }));
  };

  return (
    <View>
      {products?.length > 0 && (
        <>
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
                      addPressed={() => handleAddToCart(product)}
                      removePressed={() => handleRemoveFromCart(product)}
                      quantity={cartItem.quantity}
                    />
                  </View>
                </View>
              ) : null,
          )}
        </>
      )}
    </View>
  );
};
