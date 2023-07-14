import {
    Dimensions,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import IList from "../../interfaces/list";
  import ListItem from "./ProductCard";
  
  type Props = {
    list: IList;
    navigation: any;
  };
  
  const { width } = Dimensions.get("window");
  
  const ProductList = ({ list, navigation }: Props) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={{ width: "50%" }}
        onPress={() => navigation.navigate("Selected Coupon", { list: list })}
      >
        <View style={{ width: width / 2 }}>
          <ListItem list={list} />
        </View>
      </TouchableOpacity>
    );
  };
  
  export default ProductList;
  