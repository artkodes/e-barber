import React, { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import dynamicStyles from "../styles/Login";

import { SafeAreaView } from "react-native-safe-area-context";
import {
  useDynamicStyleSheet,
  useDarkModeContext
} from "react-native-dark-mode";

//components
import InputField from "../../components/form/InputField";
import NextArrowButton from "../../components/buttons/NextArrowButton";
import Notification from "../../components/Notification";
import Loader from "../../components/Loader";
import Text from "../../components/Typography";
import NavBarButton from "../../components/buttons/NavBarButton";

import * as theme from "../../constants/themes";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";

//header style
import transparentHeaderStyle from "../../utils/HeaderStyle";
import { Ionicons } from "@expo/vector-icons";

const darkModeColors = {
  light: theme.colors.black,
  dark: theme.colors.white
};

const backgroundColors = {
  light: theme.colors.white,
  dark: theme.colors.black4
};

let p = "";
let mail = "";
var token = null;

function Login({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavBarButton
          handleButtonPress={() => navigation.navigate("ForgotPassword")}
          location='right'
          color={darkModeColor}
          text='Forgot Password'
        />
      ),
      headerLeft: () => (
        <NavBarButton
          handleButtonPress={() => navigation.goBack()}
          location='left'
          icon={
            <Ionicons
              name='ios-arrow-round-back'
              size={32}
              color={darkModeColor}
            />
          }
        />
      ),
      headerStyle: transparentHeaderStyle,
      headerTransparent: true,
      headerTintColor: theme.colors.black
    });
  }, [navigation]);

  React.useEffect(() => {}, [state]);

  const [state, setState] = useState({
    isFormValid: true,
    isisValidEmail: false,
    isisValidPassword: false,
    isLoading: false,
    errorMessage: ""
  });

  var userdata = {};
  const _store_data = async () => {
    try {
      await AsyncStorage.setItem("userToken", token);
      console.log("token", token);
    } catch (error) {
      // Error saving data
    }
  };

  const _handleNextButton = async () => {
    setState({ ...state, isLoading: true });
    await axios({
      method: "post",
      url: "https://us-central1-e-barber-5189e.cloudfunctions.net/api/login",
      data: {
        email: mail,
        password: p
      }
    })
      .then(function(res) {
        setState({ ...state, isLoading: false });
        token = res.data.token;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        _store_data();
        userdata = res.data.userData;
        navigation.navigate("OnBoarding");
      })
      .catch(function(error) {
        setState({
          ...state,
          errorMessage: error.response.data.err.message,
          isLoading: false,
          isFormValid: false
        });
        console.log("err", error.response);
      });
  };

  const _handleEmailChange = email => {
    const { isValidEmail } = state;
    //setState({ ...state, at: email });
    mail = email;
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!isValidEmail) {
      if (emailCheckRegex.test(email)) {
        setState({ ...state, isValidEmail: true });
      }
    } else if (!emailCheckRegex.test(email)) {
      setState({ ...state, isValidEmail: false });
    }
  };

  const _handlePasswordChange = password => {
    const { isValidPassword } = state;
    //setState({ ...state, pw: password });
    console.log("p", password);
    p = password;

    if (!isValidPassword) {
      if (password.length >= 6) {
        // Password has to be at least 4 characters long
        setState({ ...state, isValidPassword: true });
      }
    } else if (password.length <= 6) {
      setState({ ...state, isValidPassword: false });
    }
  };

  const _toggleNextButtonState = () => {
    const { isValidEmail, isValidPassword } = state;
    return !(isValidEmail && isValidPassword);
  };

  //dark mode
  const styles = useDynamicStyleSheet(dynamicStyles);
  const mode = useDarkModeContext();
  const darkModeColor = darkModeColors[mode];
  const backgroundColor = backgroundColors[mode];

  const { isFormValid, isLoading, isValidEmail, isValidPassword } = state;
  const showNotification = !isFormValid;
  const background = isFormValid ? backgroundColor : theme.colors.darkOrange;
  const notificationMarginTop = showNotification ? 10 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior='padding'
      >
        <ScrollView style={styles.scrollView}>
          <Text style={styles.loginHeader}>please sign in</Text>
          <Text style={{ marginBottom: 30, color: darkModeColor }}>
            Enter your Artkodes account details for a personalised experience.
          </Text>
          <InputField
            labelText='EMAIL ADDRESS'
            labelTextSize={12}
            labelColor={theme.colors.gray02}
            textColor={theme.colors.gray02}
            borderBottomColor={theme.colors.gray02}
            inputType='email'
            onChangeText={_handleEmailChange}
            showCheckmark={isValidEmail}
            inputStyle={{
              fontSize: 14,
              fontWeight: "300",
              paddingBottom: 10,
              marginBottom: theme.sizes.base
            }}
            autoFocus
          />
          <InputField
            labelText='PASSWORD'
            labelTextSize={12}
            labelColor={theme.colors.gray02}
            textColor={theme.colors.gray02}
            borderBottomColor={theme.colors.gray02}
            inputType='password'
            onChangeText={_handlePasswordChange}
            inputStyle={{
              fontSize: 14,
              fontWeight: "300",
              paddingBottom: 10,
              marginBottom: theme.sizes.base
            }}
            showCheckmark={isValidPassword}
          />
        </ScrollView>
        <NextArrowButton
          handleNextButton={_handleNextButton}
          disabled={_toggleNextButtonState()}
        />
      </KeyboardAvoidingView>
      <Loader modalVisible={isLoading} animationType='fade' />
      {isFormValid ? null : (
        <View
          style={[
            styles.notificationWrapper,
            { marginTop: notificationMarginTop }
          ]}
        >
          <Notification
            showNotification={showNotification}
            handleCloseNotification={() => {
              setState({ ...state, isFormValid: true });
            }}
            type='Error'
            firstLine={state.errorMessage}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default Login;
