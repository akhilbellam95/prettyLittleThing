import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../Features/Cart/cartSlice';
import { RootState } from '../store';

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
        <Image source={{ uri: product.img }} style={styles.productImage} />
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
          <View style={[styles.row, { width: 120, borderColor: 'black', borderWidth: 1 }]}>
            <View style={styles.seperator} />
            <Pressable
              style={styles.addRemoveBtn}
              onPress={() => dispatch(removeFromCart(product))}
            >
              <Text style={styles.textCenter}>-</Text>
            </Pressable>

            <View style={styles.quantityBox}>
              <Text style={styles.quantity}>{cartItems[itemIndex].quantity}</Text>
            </View>

            <Pressable style={styles.addRemoveBtn} onPress={() => dispatch(addToCart(product))}>
              <Text style={styles.textCenter}>+</Text>
            </Pressable>
          </View>
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

const Products = ({ products }: Products) => {
  return (
    <View>
      <FlatList data={products} renderItem={({ item }) => <Item product={item} />} />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  addRemoveBtn: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
  },
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
    width: 250,
    height: 500,
  },
  label: {
    width: 60,
    marginBottom: 5,
  },
  quantity: {
    width: 40,
    textAlign: 'center',
  },
  quantityBox: {
    height: 40,
    justifyContent: 'center',
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
