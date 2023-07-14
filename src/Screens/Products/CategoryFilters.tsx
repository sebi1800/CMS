import React from "react";
import { FlatList, View } from "react-native";
import IList from "../../interfaces/list";
import CategoryItem from "./CategoryItem";

type Props = {
  categories: IList[];
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
  activeCategory: string;
};

const CategoryFilters = ({
  categories,
  setActiveCategory,
  activeCategory,
}: Props) => { 

  if (!categories || categories.length === 0) {
    return null;
  }

  // Create a new array of unique categories based on their name
  const uniqueCategories = categories.filter(
    (category, index, self) =>
      index === self.findIndex((c) => c.product.category.name === category.product.category.name)
  );

  // If there are no unique categories to display, return null
   if (uniqueCategories.length === 0) {
    return null;
  }

  return (
    <View>
      <FlatList
        horizontal
        style={{
          flexDirection: "row",
          marginBottom: 20,
          marginTop: -30,
          paddingHorizontal: 10,
          backgroundColor: "#fff",
        }}
        data={uniqueCategories}
        ListHeaderComponent={
          <CategoryItem
            category={"All"}
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
          />
        }
        renderItem={({ item }) => (
          <CategoryItem
            setActiveCategory={setActiveCategory}
            activeCategory={activeCategory}
            key={item.product.category._id}
            category={item.product.category.name}
          />
        )}
        keyExtractor={(item) => item.product.category._id}
      />
    </View>
  );
};

export default CategoryFilters;
