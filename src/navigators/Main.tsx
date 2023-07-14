import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "native-base";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { useAppSelector } from "../app/hooks";
import AdminNavigator from "./AdminNavigator";
import HomeNavigator from "./HomeNavigator";
import HistoryNavigator from "./HistoryNavigator";
import UserNavigator from "./UserNavigator";

const Tab = createBottomTabNavigator();

const Main = () => {
  const { user } = useAppSelector((store) => store.user);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#3B82F6",
        headerShown: false,
      }}
    >

      <Tab.Screen
        name="HomeScreen"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              color={color}
              style={{ position: "relative" }}
              size={26}
            />
          ),
        }}
      />

      <Tab.Screen
        name="HistoryScreen"
        component={HistoryNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="history"
              color={color}
              style={{ position: "relative" }}
              size={26}
            />
          ),
        }}
      />

      {user.isAdmin ? (
        <Tab.Screen
          name="Admin"
          component={AdminNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="cog" color={color} size={26} />
            ),
          }}
        />
      ) : null}

      <Tab.Screen
        name="User"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={26} />
          ),
        }}
      />

    </Tab.Navigator>
  );
};

export default Main;
