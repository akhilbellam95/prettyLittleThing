import { FlatList, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { getProducts } from '../Features/Product/productSlice';
import { ApplicationState, useAppDispatch, useAppSelector } from '../core-hooks';
import { ProductItem } from './ProductItem';

export interface Product {
  id: number;
  name: string;
  img: string;
  price: number;
  colour: string;
}

interface Products {
  products: Product[];
}

const Products = () => {
  const { products } = useAppSelector((state: ApplicationState) => state.product);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <View>
      <FlatList data={products} renderItem={({ item }) => <ProductItem product={item} />} />
    </View>
  );
};

export default Products;

export const styles = StyleSheet.create({
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
