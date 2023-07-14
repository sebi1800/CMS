import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HistoryContainer from "./../Screens/History/HistoryContainer";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HistoryContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function HomeNavigator() {
  return <MyStack />;
}
