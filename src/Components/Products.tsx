import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../Features/Cart/cartSlice';
import { RootState } from '../store';
import { getProducts } from '../Features/Cart/productSlice';
import AddRemoveItem from './AddRemoveItem';
import FastImage from 'react-native-fast-image';

interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  colour: string;
}

interface Products {
  products: Product[];
}

const Item = ({ product }: { product: Product }): JSX.Element => {
  const { cartItems } = useSelector((state: RootState) => state.cart);

  const itemInCart = cartItems.find((el): boolean => el.id === product.id);
  const itemIndex = cartItems.findIndex((el): boolean => el.id === product.id);
  const dispatch = useDispatch();
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
          <Pressable style={styles.button} onPress={() => dispatch(addToCart(product))}>
            <Text style={styles.textCenter}>Add to Cart</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const Products = () => {
  const { products } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <View>
      <FlatList data={products} renderItem={({ item }) => <Item product={item} />} />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  alignCenter: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'yellow',
    width: 120,
    height: 40,
    justifyContent: 'center',
    position: 'relative',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
  card: {
    padding: 20,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  productDetails: {
    borderTopWidth: 1,
    borderTopColor: 'black',
    marginTop: 20,
    paddingTop: 15,
  },
  productImage: {
    width: 280,
    height: 500,
  },
  label: {
    width: 60,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
  },
  seperator: {
    height: 20,
  },
  textCenter: {
    textAlign: 'center',
  },
  value: {
    width: '75%',
  },
});
