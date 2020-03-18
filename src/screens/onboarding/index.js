import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  TouchableHighlight,
  ScrollView,
  AsyncStorage
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

import { SafeAreaView } from "react-native-safe-area-context";
import RoundedButton from "../../components/buttons/RoundedButton";

import * as theme from "../../constants/themes";

//header style
import transparentHeaderStyle from "../../utils/HeaderStyle";
import { Ionicons } from "@expo/vector-icons";
import NavBarButton from "../../components/buttons/NavBarButton";
import styles from "../styles/LoggedOut";

const Index = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavBarButton
          handleButtonPress={() => navigation.navigate("LoginScreen")}
          location='right'
          color={theme.colors.black}
          text='Login'
        />
      ),
      headerStyle: transparentHeaderStyle,
      headerTransparent: true,
      headerTintColor: theme.colors.black
    });
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log("focus");

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const dispatch = useDispatch();

  return (
    <ScrollView style={styles.wrapper}>
      <View style={[styles.welcomeWrapper, { marginTop: 200 }]}>
        <Text style={styles.welcomeText}>Welcome.</Text>
        <RoundedButton
          text='Continue with Facebook'
          textColor={theme.colors.green01}
          background='transparent'
          borderColor={theme.colors.black}
          handleOnPress={() => {
            navigation.navigate("Home");
          }}
        />

        <RoundedButton
          text='Create Account'
          textColor={theme.colors.black}
          borderColor={theme.colors.black}
          handleOnPress={() => {
            navigation.navigate("CreateAccount");
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Index;
