import { Text, StyleSheet, View } from "react-native";
import React from "react";
import IProduct from "./../../interfaces/product";
import tw from "tailwind-react-native-classnames";

type Props = { item: IProduct; };

const ProductItem = ({ item }: Props) => {
  return (
    <View style={[tw`flex-row w-full bg-white px-4 py-1 items-center justify-center shadow-lg`]}>
      <Text numberOfLines={1} style={styles.itemText}>
        {item.name}
      </Text>
      <Text numberOfLines={1} style={styles.itemText}>
        {item.category.name}
      </Text>
      <Text numberOfLines={1} style={styles.itemText}>
        x{item.quantity}
      </Text>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    flexBasis: "30%",
    paddingHorizontal: 5,
  },
});
