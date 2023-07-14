import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import IList from "./../../interfaces/list";
import moment from "moment-timezone";

type Props = {
  list: IList;
};
const { width } = Dimensions.get("window");

const ListItem = ({ list }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.category}>{list.product.category.name}</Text>
        <Text style={styles.name}>{list.product.name}</Text>
        <Text style={styles.expire}>Expire Date:</Text>
        <Text style={styles.date}>{moment(list?.expiryDate).format("MMM D, YYYY, h:mm A")}</Text>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: 200,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
    zIndex: 40,
  },
  card: {
    marginBottom: 10,
    height: 100,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  category: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 50,
  },
  expire:{
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    marginTop: 40,
  },
  date:{
    fontSize: 13,
    textAlign: "center",
  },
});