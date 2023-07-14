import React from "react";
import { FlatList, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useAppSelector } from "../../app/hooks";
import { API_URL } from "../../constants";
import { useFetchData } from "../../hooks/useFetchData";
import Button from "../../shared/UI/Button";
import Loading from "../../shared/UI/Loading";
import IHistory from "./../../interfaces/history";
import HistoryCard from "./HistoryCard";

type Props = { navigation: any };

const HistoryContainer = ({ navigation }: Props) => {
  const { token, user } = useAppSelector((store) => store.user);
  const [history, historyLoading] = useFetchData<IHistory>(
    "GET",
    `${API_URL}/productHistories/${user._id}`,
    "productHistories",
    { Authorization: `Bearer ${token}` },
    user._id !== ""
  );

  if (historyLoading) {
    return <Loading />;
  }

  if (user._id === "") {
    return (
      <View style={tw`justify-center items-center mx-6 flex-1`}>
        <Text style={tw`text-3xl text-center font-semibold text-gray-800 mb-4`}>
          Login to see your history
        </Text>
        <View style={tw`w-full`}>
          <Button text="Login" onPress={() => navigation.navigate("User")} />
        </View>
      </View>
    );
  }
  if (!history || history.length === 0) {
    return (
      <View style={tw`justify-center items-center mx-6 flex-1`}>
        <Text style={tw`text-3xl text-center font-semibold text-gray-800`}>
          You have no history yet
        </Text>
        <Text style={tw`text-xl text-center font-medium text-gray-400`}>
          Use coupons to get started
        </Text>
      </View>
    );
  }

  // Sort the history array by date
  history.sort((a, b) => {
    const dateA = new Date(a.date) as Date;
    const dateB = new Date(b.date) as Date;
    return dateB.getTime() - dateA.getTime();
  });  

  return (
    <View style={tw`flex-1 items-center`}>
      <Text style={tw`text-3xl font-bold my-4`}>History</Text>
      <View style={tw`w-full pb-20`}>
        <FlatList
          data={history}
          renderItem={(item) => <HistoryCard history={item.item} />}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

export default HistoryContainer;
