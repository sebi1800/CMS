import {
  View,
  Text,
  TouchableOpacity
} from "react-native";
import React, { useState } from "react";
import FormContainer from "../../shared/Form/FormContainer";
import tw from "tailwind-react-native-classnames";
import Input from "../../shared/Form/Input";
import SelectDropdown from "react-native-select-dropdown";
import { useFetchData } from "./../../hooks/useFetchData";
import ICategory from "./../../interfaces/category";
import { API_URL } from "../../constants";
import Button from "../../shared/UI/Button";
import ErrorText from "../../shared/UI/ErrorText";
import { useAppSelector } from "../../app/hooks";
import axios from "axios";
import Toast from "react-native-toast-message";
import DateTimePicker from "@react-native-community/datetimepicker"
import { AntDesign } from '@expo/vector-icons';

type Props = { navigation: any };

const ProductForm = (props: Props) => {
  const { token, user } = useAppSelector((store) => store.user);
  const [categories, categoryLoading] = useFetchData<ICategory>(
    "GET",
    `${API_URL}/categories/${user._id}`,
    "categories",
    { Authorization: `Bearer ${token}` },
    user._id !== ""
  );

  const categoriesData = Array.isArray(categories)
  ? categories.map((category) => {
      return { name: category.name, id: category.id };
    })
  : [];

  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const addProduct = () => {
    if (
      category === "" ||
      name === "" ||
      quantity === 0 ||
      description === "" ||
      !expiryDate
    ) {
      setError("Please fill in the form correctly");
    }

    const productData = {
      category,
      name,
      quantity,
      description,
      expiryDate,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${API_URL}/products/create`, productData, config)
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "New Product added.",
          });
          setTimeout(() => {
            props.navigation.navigate("Products");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong.",
        });
      });
  };

  return (
    <FormContainer title="Add Product">
      <>
        <View style={tw`w-full`}>
          <View>
            <Text style={tw`text-xl font-semibold`}>Name</Text>
            <Input
              value={name.toString()}
              className={tw`mt-1`}
              onChangeText={(text) => setName(text)}
              placeholder="Name"
            />
          </View>

          <View>
            <Text style={tw`text-xl font-semibold`}>Description</Text>
            <Input
              value={description}
              className={tw`mt-1`}
              onChangeText={(text) => setDescription(text)}
              placeholder="Description"
            />
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Quantity</Text>
            <Input
              value={quantity.toString()}
              className={tw`mt-1`}
              onChangeText={(text) => setQuantity(Number(text))}
              placeholder="Quantity"
            />
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Expiry Date</Text>
            <TouchableOpacity
              onPress={() =>
              setShowDatePicker((prevShowDatePicker) => !prevShowDatePicker)
              }
              style={tw`bg-white h-16 my-2 rounded-2xl p-3 border-2 border-blue-500 flex flex-row items-center justify-between`}
            >
              <Text>{expiryDate.toDateString()}</Text>
              <AntDesign name="calendar" size={24} color="black" />
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={expiryDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || expiryDate;
                  setShowDatePicker(false);
                  setExpiryDate(currentDate);
                }}
              />
            )}
          </View>
          <View>
            <Text style={tw`text-xl font-semibold`}>Category</Text>
            <SelectDropdown
              data={categoriesData}
              onSelect={(selectedItem, index) => {
                setCategory(selectedItem.id);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                return item.name;
              }}
              buttonStyle={tw`w-full bg-white h-16 my-2 rounded-2xl p-3 border-2 border-blue-500`}
            />
          </View>
          <ErrorText error={error} />
          <Button text="Add" onPress={addProduct} className={tw`my-3`} />
        </View>
      </>
    </FormContainer>
  );
};

export default ProductForm;
