import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  Alert,
  TouchableHighlight,
  ScrollView
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import RoundedButton from "../../components/buttons/RoundedButton";

import * as theme from "../../constants/themes";

//header style
import transparentHeaderStyle from "../../utils/HeaderStyle";
import { Ionicons } from "@expo/vector-icons";
import NavBarButton from "../../components/buttons/NavBarButton";

import dynamicStyles from "../styles/LoggedOut";

import {
  useDynamicStyleSheet,
  useDarkModeContext
} from "react-native-dark-mode";

const darkModeColors = {
  light: theme.colors.black,
  dark: theme.colors.white
};

const Index = ({ navigation }) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavBarButton
          handleButtonPress={() => navigation.navigate("LoginScreen")}
          location='right'
          color={darkModeColor}
          text='Login'
        />
      ),
      headerStyle: transparentHeaderStyle,
      headerTransparent: true,
      headerTintColor: theme.colors.black
    });
  }, [navigation]);

  // do something when screen is focused or unfocused
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

  //dark mode
  const styles = useDynamicStyleSheet(dynamicStyles);
  const mode = useDarkModeContext();
  const darkModeColor = darkModeColors[mode];

  return (
    <ScrollView style={styles.wrapper}>
      <View style={[styles.welcomeWrapper, { marginTop: 200 }]}>
        <Text style={styles.welcomeText}>Welcome.</Text>
        <RoundedButton
          text='Continue with Facebook'
          textColor={darkModeColor}
          background='transparent'
          borderColor={darkModeColor}
          handleOnPress={() => {
            navigation.navigate("Home");
          }}
        />

        <RoundedButton
          text='Create Account'
          textColor={darkModeColor}
          borderColor={darkModeColor}
          handleOnPress={() => {
            navigation.navigate("CreateAccount");
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Index;
