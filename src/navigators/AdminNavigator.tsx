import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Products from "./../Screens/Admin/Products";
import Categories from "./../Screens/Admin/Categories";
import ProductForm from "../Screens/Admin/ProductForm";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Products}
        options={{ title: "Products" }}
      />
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ title: "Categories" }}
      />
      <Stack.Screen
        name="Product Form"
        component={ProductForm}
        options={{ title: "Product Form" }}
      />
    </Stack.Navigator>
  );
};

export default function AdminNavigator() {
  return <MyStack />;
}
