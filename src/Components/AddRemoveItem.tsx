import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';

interface AddRemoveItemProps {
  removePressed: () => void;
  addPressed: () => void;
  quantity: string | number;
  style?: object;
}

const AddRemoveItem = ({
  removePressed,
  addPressed,
  quantity,
  style,
}: AddRemoveItemProps): JSX.Element => {
  return (
    <View style={[styles.row, { width: 120, borderColor: 'black', borderWidth: 1, ...style }]}>
      <View style={styles.seperator} />
      <Pressable testID='remove-btn' style={styles.addRemoveBtn} onPress={removePressed}>
        <Text style={styles.textCenter}>-</Text>
      </Pressable>

      <View style={styles.quantityBox}>
        <Text style={styles.quantity}>{quantity}</Text>
      </View>

      <Pressable testID='add-btn' style={styles.addRemoveBtn} onPress={addPressed}>
        <Text style={styles.textCenter}>+</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  addRemoveBtn: {
    flex: 1,
    backgroundColor: 'yellow',
    justifyContent: 'center',
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
});

export default AddRemoveItem;
