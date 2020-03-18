import React, { useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import styles from "../styles/Login";

//components
import InputField from "../../components/form/InputField";
import NextArrowButton from "../../components/buttons/NextArrowButton";
import Notification from "../../components/Notification";
import Loader from "../../components/Loader";
import Text from "../../components/Typography";

import * as theme from "../../constants/themes";

//header style
import transparentHeaderStyle from "../../utils/HeaderStyle";
import { Ionicons } from "@expo/vector-icons";

import NavBarButton from "../../components/buttons/NavBarButton";

import { SafeAreaView } from "react-native-safe-area-context";

function Login({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <NavBarButton
          handleButtonPress={() => navigation.navigate("ForgotPassword")}
          location='right'
          color={theme.colors.black}
          text='Forgot Password'
        />
      ),
      headerLeft: () => (
        <NavBarButton
          handleButtonPress={() => navigation.goBack()}
          location='left'
          icon={
            <Ionicons name='ios-arrow-round-back' size={32} color='black' />
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
    errorMessage: "",
    at: "",
    pw: "",
    token: ""
  });

  const _handleEmailChange = email => {
    const { isValidEmail } = state;
    setState({ ...state, at: email });
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
    setState({ ...state, pw: password });
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

  const { isFormValid, isLoading, isValidEmail, isValidPassword } = state;
  const showNotification = !isFormValid;
  const background = isFormValid ? theme.colors.white : theme.colors.darkOrange;
  const notificationMarginTop = showNotification ? 10 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior='padding'
      >
        <ScrollView style={styles.scrollView}>
          <Text style={styles.loginHeader}>please sign in</Text>
          <Text style={{ marginBottom: 30 }}>
            Enter your e-barber account details for a personalised experience.
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
          //   handleNextButton={_handleNextButton}
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
            firstLine={errorMessage}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default Login;
