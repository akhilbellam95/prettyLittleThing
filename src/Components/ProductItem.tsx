import { Pressable, Text, View } from 'react-native';
import React from 'react';
import { addToCart, removeFromCart } from '../Features/Cart/cartSlice';
import { RootState } from '../store';
import AddRemoveItem from './AddRemoveItem';
import FastImage from 'react-native-fast-image';
import { Product, styles } from './Products';
import { ApplicationState, useAppDispatch, useAppSelector } from '../core-hooks';

export const ProductItem = ({ product }: { product: Product }): JSX.Element => {
  const { cartItems } = useAppSelector((state: ApplicationState) => state.cart);

  const itemInCart = cartItems.find((el): boolean => el.id === product.id);
  const itemIndex = cartItems.findIndex((el): boolean => el.id === product.id);
  const dispatch = useAppDispatch();
  return (
    <View style={styles.card}>
      <View style={styles.alignCenter}>
        <FastImage
          source={{ uri: product.img, priority: FastImage.priority.normal }}
          style={styles.productImage}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View style={styles.productDetails}>
        <View style={styles.row}>
          <Text style={styles.label}>Name: </Text>
          <Text style={styles.value}>{product.name}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Price: </Text>
          <Text style={styles.value}>{product.price}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Colour: </Text>
          <Text style={styles.value}>{product.colour}</Text>
        </View>
      </View>

      <View style={styles.seperator} />
      <View style={{ alignItems: 'flex-end' }}>
        {itemInCart ? (
          // Add & Remove from cart buttons with quantity
          <AddRemoveItem
            addPressed={() => dispatch(addToCart(product))}
            removePressed={() => dispatch(removeFromCart(product))}
            quantity={cartItems[itemIndex].quantity}
          />
        ) : (
          // Add to cart button
          <Pressable
            style={styles.button}
            testID='add-to-cart'
            onPress={() => dispatch(addToCart(product))}
          >
            <Text style={styles.textCenter}>Add to Cart</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};
