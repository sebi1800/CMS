import {
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import IList from "./../../interfaces/list";
import tw from "tailwind-react-native-classnames";

type Props = { 
  list: IList; 
  navigation: any; 
};

const SearchedProduct = ({ list, navigation }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate("Selected Coupon", { item: list })}
    >
      <View style={tw`flex-row items-center mb-3 pr-2`}>
        <View style={tw`flex-1`}>
          <Text numberOfLines={1} style={tw`text-xl font-bold w-full`}>
            {list.product.name}
          </Text>
          <Text numberOfLines={3} style={tw`text-lg text-gray-400 w-full`}>
            {list.product.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SearchedProduct;
