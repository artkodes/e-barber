import React from "react";
import { View, Text } from "react-native";

import AsyncStorage from "@react-native-community/async-storage";

import { useSelector, useDispatch } from "react-redux";

const Index = () => {
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  console.log(userData);

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("userToken", "stored value");
    } catch (e) {
      // saving error
    }
  };

  //   setInterval(() => {
  //     storeData();
  //   }, 3000);

  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>Signin</Text>
    </View>
  );
};

export default Index;
