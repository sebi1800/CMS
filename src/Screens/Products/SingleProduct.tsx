import axios from "axios";
import React, { useState, useEffect, useRef  } from "react";
import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import Toast from "react-native-toast-message";
import { API_URL } from "../../constants";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { changeProductQuantity } from './../../features/list/listSlice';
import QRCode from 'react-native-qrcode-svg';
import moment from "moment-timezone";


type Props = {
  route: any;
};

const { width } = Dimensions.get("window");

const SingleListItem = ({ route }: Props) => {
  const list = route.params?.list || {};

  const dispatch = useAppDispatch();

  const { token, user } = useAppSelector((store) => store.user);
  const { listItems } = useAppSelector((store) => store.listState);
  const [deleting, setDeleting] = useState(false);
  const [timer, setTimer] = useState(0);
  const [updatedQuantity, setUpdatedQuantity] = useState(list?.quantity);

  async function deleteCoupon() {
    setDeleting(true);
    try {
      if (!list) throw new Error();
      const response = await axios({
        method: "DELETE",
        url: `${API_URL}/productQuantities/${user._id}/${list?.product?._id}`,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 202 || response.status === 200) {
        setTimer(10); // set the timer to 120 seconds (2 minutes)

        // Update the state with the new quantity
        const newQuantity = updatedQuantity - 1;
        setUpdatedQuantity(newQuantity);
        dispatch(changeProductQuantity({ id: list.product._id, quantity: newQuantity }));
      
        
        Toast.show({
          topOffset: 60,
          type: "success",
          text1: `Coupon ${list?.product?.name} has been activated`,
        });
      } else {
        throw new Error();
      }
    } catch (error) {
      Toast.show({
        topOffset: 60,
        type: "error",
        text1: "Something went wrong",
        text2: "Please, try again",
      });
      console.log("Catch: " + error);
    } finally {
      setDeleting(false);
    }
  }

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    setUpdatedQuantity(list?.quantity);
  }, [list]);

  useEffect(() => {
    setTimer(0);
  }, [list?.product?._id]);

  return (
    <View style={styles.container}>
      <View style={[tw`items-center flex-row mb-2`, { flexWrap: "wrap" }]}>
        <View style={[tw`w-full justify-center items-center mt-3`]}>
          <Text style={tw`text-2xl font-bold`}>{list?.product?.category?.name}</Text>
        </View>
        <View
          style={tw`items-center my-3 justify-between flex-row w-full border-2 border-gray-200 py-1 px-4`}
        >
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-2xl`}>{list?.product?.name}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <Text style={tw`text-xl`}>x{updatedQuantity}</Text>
          </View>
        </View>
        <View style={[tw`ml-3 mt-3`]}>
          <Text style={tw`text-lg`}>{list?.product?.description}</Text>
        </View>
        <View style={[tw`w-full justify-center items-center mt-20`]}>
          <QRCode value={`${API_URL}/productQuantities/${user._id}/${list?.product?._id}`} size={150} />
        </View>
        <View style={[tw`w-full justify-center items-center mt-4`]}>
          <TouchableOpacity 
            style={tw`bg-green-500 px-20 py-3 rounded-full ${timer > 0 ? 'opacity-90' : ''}`}
            onPress={() => deleteCoupon()}
            disabled={timer > 0}
          >
            <Text style={tw`text-white font-bold text-lg`}>
              {timer > 0 ? `Active (${timer})` : `Activate`}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[tw`w-full justify-center items-center mt-6`]}>
          <Text>
            <Text style={tw`font-semibold`}>Expire Date:</Text>{" "}
            {moment(list?.expiryDate).format("MMM D, YYYY, h:mm A")}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SingleListItem;

const styles = StyleSheet.create({
  container: {
    width: width - 60,
    height: 510,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 30,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
    zIndex: 40,
  },
});
