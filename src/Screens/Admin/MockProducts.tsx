import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "tailwind-react-native-classnames";
import MockProductItem from "./MockProductItem";
import SearchInput from "../../shared/UI/SearchInput";
import useDebounce from "../../hooks/useDebounced";
import Button from "../../shared/UI/Button";
import ICategory from "../../interfaces/category";
import IProduct from "../../interfaces/product";

// Mock category objects
const electronicsCategory: ICategory = { id: "101", _id: "101", name: "Electronics" };
const furnitureCategory: ICategory = { id: "102", _id: "102", name: "Furniture" };

// Mock product data for offline testing
const MOCK_PRODUCTS: IProduct[] = [
  { _id: "1", name: "Laptop", category: electronicsCategory, quantity: 10, description: "A powerful laptop", expiryDate: 2026 },
  { _id: "2", name: "Phone", category: electronicsCategory, quantity: 25, description: "Latest smartphone", expiryDate: 2025 },
  { _id: "3", name: "Desk Chair", category: furnitureCategory, quantity: 5, description: "Ergonomic office chair", expiryDate: 2027 },
];

type Props = { navigation: any };

const MockProducts = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>(MOCK_PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(MOCK_PRODUCTS);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  // Delete product function
  const deleteProduct = (id: string) => {
    // Remove the product from the products list
    const updatedProducts = products.filter((product) => product._id !== id);
      
    // Update both the products and filteredProducts states
    setProducts(updatedProducts);
    setFilteredProducts(updatedProducts);
  };
      

  // Filter products based on search input
  const searchProduct = (text: string) => {
    setFilteredProducts(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  useEffect(() => {
    searchProduct(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const getTableHeader = () => {
    return (
      <View
        style={tw`flex-row z-10 w-full bg-gray-200 px-4 py-2 items-center shadow-lg`}
      >
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
        renderItem={({ item }) => <MockProductItem key={item._id} item={item} onDelete={deleteProduct} />}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

export default MockProducts;
