import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import SingleProduct from "../Screens/Products/SingleProduct";
import ProductContainer from "./../Screens/Products/ProductContainer";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={ProductContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Selected Coupon"
        component={SingleProduct}
      />
    </Stack.Navigator>
  );
};

export default function HomeNavigator() {
  return <MyStack />;
}
