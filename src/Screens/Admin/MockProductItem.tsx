import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import IProduct from "./../../interfaces/product";
import tw from "tailwind-react-native-classnames";
import Icon from "react-native-vector-icons/FontAwesome"; 

type Props = {
  item: IProduct;
  onDelete: (id: string) => void; // Add the onDelete prop to the type definition
};

const MockProductItem = ({ item, onDelete }: Props) => {
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

      {/* Trashcan Icon */}
      <TouchableOpacity onPress={() => onDelete(item._id)}>
        <Icon name="trash" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default MockProductItem;

const styles = StyleSheet.create({
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    flexBasis: "30%",
    paddingHorizontal: 5,
  },
});
