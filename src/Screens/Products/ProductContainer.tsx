import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useAppSelector } from "../../app/hooks";
import { API_URL } from "../../constants";
import { useFetchData } from "../../hooks/useFetchData";
import Banner from "../../shared/Banner";
import Button from "../../shared/UI/Button";
import Loading from "../../shared/UI/Loading";
import SearchInput from "../../shared/UI/SearchInput";
import useDebounce from "./../../hooks/useDebounced";
import IList from "./../../interfaces/list";
import CategoryFilters from "./CategoryFilters";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";

const bannerImages = [
  "data:image/png;base64,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",
  "https://play-lh.googleusercontent.com/uBCQPdCCHbFJCk3dDidGQ1paIeHaLRi-tJn83t2MkRoYiUX0X3K9CP3uV7dusjfRsqV5",
  "https://play-lh.googleusercontent.com/3HmuNGl1WqhLrKrC11sRXOPPsBbitESnB_ZgZjruaVdkZA32tjpudfYx8O6ytHYG9Sw=w600-h300-pc0xffffff-pd",
];

const List = (props: any) => {
  const { token, user } = useAppSelector((store) => store.user);
  const [filteredProducts, setFilteredProducts] = useState<IList[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<IList[]>([]);
  const [list, listLoading] = useFetchData<IList>(
    "GET",
    `${API_URL}/productQuantities/${user._id}`,
    "productQuantities",
    { Authorization: `Bearer ${token}` },
    user._id !== ""
  );

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [initialState, setInitialState] = useState(list);
  const [focus, setFocus] = useState(false);
  const isCategoryChosen: boolean = activeCategory.toLowerCase() === "all";
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const productsData: IList[] = isCategoryChosen
    ? list
    : categoryProducts;

  useEffect(() => {
    setFilteredProducts(list);
    setCategoryProducts(list);
  }, [list]);

  useEffect(() => {
    setFocus(false);
    setActiveCategory("All");
  }, []);

  useEffect(() => {
    searchProduct(debouncedSearchValue);
  }, [debouncedSearchValue]);

  const searchProduct = (text: string) => {
    setFilteredProducts(
      list.filter((i) => i.product.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const onFocus = () => {
    setFocus(true);
  };
  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const filterProductsByCategory = () => {
    if (activeCategory.toLowerCase() === "all") {
      setCategoryProducts(initialState);
    } else {
      setCategoryProducts(
        list.filter((list) => list.product.category.name === activeCategory)
      );
    }
  };

  // useFocusEffect(() => setFocus(false));

  useEffect(() => {
    filterProductsByCategory();
  }, [activeCategory]);

  const ListHeaderComponent = (
    <>
      <View>
        <Banner bannerImages={bannerImages} />
      </View>

      <CategoryFilters
        categories={list}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </>
  );

  if (user._id === "") {
    return (
      <View style={tw`justify-center items-center mx-6 flex-1`}>
        <Text style={tw`text-3xl text-center font-semibold text-gray-800 mb-4`}>
          Login to see your coupon
        </Text>
        <View style={tw`w-full`}>
          <Button text="Login" onPress={() => props.navigation.navigate("User")} />
        </View>
      </View>
    );
  }
  if (!list || list.length === 0) {
    return (
      <View style={tw`justify-center items-center mx-6 flex-1`}>
        <Text style={tw`text-3xl text-center font-semibold text-gray-800`}>
          You have no coupons yet
        </Text>
        <Text style={tw`text-xl text-center font-medium text-gray-400`}>
          Wait for coupons to get started
        </Text>
      </View>
    );
  }

  return (
    <View>
      <SearchInput
        setSearchValue={setSearchValue}
        focus={focus}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {listLoading ? (
        <Loading />
      ) : (
        <>
          {focus ? (
            <SearchedProducts
              navigation={props.navigation}
              filteredProducts={filteredProducts}
            />
          ) : (
            <FlatList
              ListEmptyComponent={
                <Text style={tw`text-2xl text-center`}>No products found</Text>
              }
              ListHeaderComponent={ListHeaderComponent}
              columnWrapperStyle={{ justifyContent: "space-between" }}
              numColumns={2}
              data={productsData}
              renderItem={(item) => <ProductList list={item.item} navigation={props.navigation} />}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ paddingBottom: 50 }}
            />
          )}
        </>
      )}
    </View>
  );
};

export default List;
