import { View, Text, FlatList } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFetchData } from "../../hooks/useFetchData";  // Custom hook to fetch data
import IProduct from "../../interfaces/product";  // IProduct interface
import { API_URL } from "../../constants";  // API URL constant
import tw from "tailwind-react-native-classnames";  // Tailwind CSS for React Native
import MockProductItem from "./MockProductItem";  // ProductItem component for each item in the list
import Loading from "../../shared/UI/Loading";  // Loading component for showing loading state
import SearchInput from "../../shared/UI/SearchInput";  // Search input component
import useDebounce from "../../hooks/useDebounced";  // Debounced hook for search input
import Button from "../../shared/UI/Button";  // Button component for UI actions

type Props = { navigation: any };

const ApiProducts = (props: Props) => {
  const [products, productsLoading] = useFetchData<IProduct>(
    "GET",
    `${API_URL}/products`,
    "products"
  );  // Fetch products initially
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);  // For filtering and displaying products
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
    setFilteredProducts(products);  // Update filtered products whenever products change
  }, [products]);

  const deleteProduct = (id: string) => {
    // Make the API call to delete the product
    fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,  // Include token if required by your API
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete product");
        }
        // After successful deletion, update filteredProducts
        const updatedProducts = filteredProducts.filter((product) => product._id !== id);
        setFilteredProducts(updatedProducts);  // Update filteredProducts state
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

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
        ListEmptyComponent={<Text style={tw`text-2xl mt-4 text-center`}>No products found</Text>}
        data={filteredProducts}  // Use filteredProducts to render the list
        ListHeaderComponent={getTableHeader}  // Call the getTableHeader function here
        renderItem={({ item }) => (
          <MockProductItem
            key={item._id}
            item={item}
            onDelete={deleteProduct}  // Pass the delete function to ProductItem
          />
        )}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default ApiProducts;
