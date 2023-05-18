import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Products from '../Components/Products';
import axios from 'axios';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Features/Cart/productSlice';
import { RootState } from '../store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const Home = (): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <Products />
      </View>
      <View style={styles.cartButtonBox}>
        <Pressable style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.goToCart}>Go to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'beige',
    alignItems: 'center',
  },
  cartButton: {
    backgroundColor: '#FDBEDB',
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 10,
  },
  cartButtonBox: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goToCart: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
