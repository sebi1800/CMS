import { View, Text, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetchData } from "../../hooks/useFetchData";
import IProduct from "../../interfaces/product";
import { API_URL } from "../../constants";
import tw from "tailwind-react-native-classnames";
import ProductItem from "./ProductItem";
import Loading from "../../shared/UI/Loading";
import SearchInput from "../../shared/UI/SearchInput";
import useDebounce from "../../hooks/useDebounced";
import Button from "../../shared/UI/Button";

type Props = { navigation: any };

const Products = (props: Props) => {
  const [products, productsLoading] = useFetchData<IProduct>(
    "GET",
    `${API_URL}/products`,
    "products"
  );
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [token, setToken] = useState("");

  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res || "");
        })
        .catch((error) => console.log(error));
    }, [])
  );

  const searchProduct = (text: string) => {
    setFilteredProducts(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  useEffect(() => {
    searchProduct(debouncedSearchValue);
  }, [debouncedSearchValue]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const getTableHeader = () => {
    return (
      <View
        style={tw`flex-row z-10 w-full bg-gray-200 px-4 py-2 items-center shadow-lg`}
      >
        <Text numberOfLines={1} style={tw`text-base w-12 font-bold`}></Text>
        <Text numberOfLines={1} style={tw`text-base mr-3 px-1 font-bold`}>
          Name
        </Text>
        <Text numberOfLines={1} style={tw`text-base mr-3 px-1 font-bold`}>
          Category
        </Text>
        <Text numberOfLines={1} style={tw`text-base mr-3 px-1 font-bold`}>
          Quantity
        </Text>
      </View>
    );
  };

  if (productsLoading) {
    return <Loading />;
  }
  return (
    <View style={tw`h-full`}>
      <Button
        text="Add product"
        className={tw`mr-4 ml-auto w-2/5 my-2 py-1`}
        textClassName={tw`text-xl`}
        onPress={() => props.navigation.navigate("Product Form")}
      />
      <SearchInput setSearchValue={setSearchValue} />
      <FlatList
        ListEmptyComponent={
          <Text style={tw`text-2xl mt-4 text-center`}>No products found</Text>
        }
        data={filteredProducts}
        ListHeaderComponent={getTableHeader}
        renderItem={({ item, index }) => (
          <ProductItem
            key={item._id}
            item={item}
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default Products;
