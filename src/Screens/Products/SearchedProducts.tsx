import React from "react";
import {
  Dimensions,
  FlatList,
  Text,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import IList from "../../interfaces/list";
import SearchedProduct from "./SearchedProduct";
import ProductList from "./ProductList";

type Props = {
  filteredProducts: IList[];
  navigation: any;
};

const { width } = Dimensions.get("window");

const SearchedProducts = ({filteredProducts, navigation }: Props) => {
  return (
    <View style={{ width: width - 40, flex: 1 }}>
      {filteredProducts.length > 0 ? (
        <>
          <FlatList
            data={filteredProducts}
            renderItem={(item) => <ProductList list={item.item} navigation={navigation} />}
            keyExtractor={(item) => item.product._id}
          />
        </>
      ) : (
        <View style={tw`items-center justify-center`}>
          <Text style={tw`text-center text-xl`}>
            No products match the selected filter
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchedProducts;
