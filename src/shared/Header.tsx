import { Image, Pressable, StyleSheet, StatusBar, Text, View } from "react-native";
import React from "react";
import SafeAreaView from "react-native-safe-area-view";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
      />
      <SafeAreaView style={[styles.header, tw`shadow-2xl`]}>
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/logo.png")}
            resizeMode="contain"
            style={{ height: 90, marginBottom: 10 }}
          />
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
});
