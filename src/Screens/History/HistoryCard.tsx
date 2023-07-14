import React from "react";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import IHistory from "./../../interfaces/history";
import moment from "moment-timezone";

type Props = {
  history: IHistory;
};

const HistoryCard = ({ history }: Props) => {
  return (
    <View style={tw`bg-white px-4 py-3 shadow-lg rounded-md my-2 mx-6`}>
      <Text style={tw`text-sm text-gray-400`}>№{history._id}</Text>
      <Text
        style={tw`text-base text-gray-800 w-full border-b-2 border-gray-100 py-1`}
      >
        <Text style={tw`font-semibold`}>Date Used:</Text>{" "}
        {moment(history.date).format("MMM D, YYYY, h:mm A")}
      </Text>
      <Text style={tw`text-base font-semibold text-gray-800 py-1`}>
        Product:
      </Text>
      <View style={[tw`items-center flex-row mb-2`, { flexWrap: "wrap" }]}>
        <Text
          numberOfLines={1}
          style={tw`text-base font-semibold mr-2 w-2/3`}
        >
          {history.product.name}
        </Text>
        <Text style={tw`text-base`}>x{history.quantity}</Text>
      </View>
    </View>
  );
};

export default HistoryCard;
