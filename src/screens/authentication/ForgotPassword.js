import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from "react-native";

//components
import InputField from "../../components/form/InputField";
import Notification from "../../components/Notification";
import NextArrowButton from "../../components/buttons/NextArrowButton";
import Loader from "../../components/Loader";
import styles from "../styles/ForgotPassword";

import * as theme from "../../constants/themes";

//header style
import transparentHeaderStyle from "../../utils/HeaderStyle";
import { Ionicons } from "@expo/vector-icons";
import NavBarButton from "../../components/buttons/NavBarButton";

import { SafeAreaView } from "react-native-safe-area-context";

export default function ForgotPassword({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
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

  const [state, setState] = useState({
    isValidForm: true,
    isLoading: false,
    isValidEmail: false,
    isEmailSend: false,
    errorMessage: "",
    emailSendMessage: "",
    at: ""
  });

  const { isLoading, isValidForm, isValidEmail } = state;
  const background = isValidForm ? theme.colors.white : theme.colors.darkOrange;
  const showNotification = !isValidForm;
  const isEmailSend = state.isEmailSend;

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

  const goToNextStep = () => {
    const { emailAddress } = this.state;
    this.setState({ isLoading: true });
    // setTimeout(() => {
    //   const { navigation } = this.props;
    //   firebase
    //     .auth()
    //     .sendPasswordResetEmail(this.emailAddress)
    //     .then(
    //       () => {
    //         this.setState({
    //           isLoading: false,
    //           isValidForm: true,
    //           isEmailSend: true,
    //           isEmailSendMessage: "Email send"
    //         });
    //         //Alert.alert("Password reset email has been send.");
    //         //navigation.navigate("Login");
    //       },
    //       error => {
    //         this.setState({
    //           isLoading: false,
    //           isValidForm: false,
    //           errorMessage: error.message
    //         });
    //       }
    //     );
    // }, 2000);
  };

  const handleCloseNotification = () => {
    setState({ ...state, isValidForm: true, isEmailSend: false });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior='padding'
      >
        <ScrollView style={styles.scrollView}>
          <Text style={styles.forgotPasswordHeading}>
            Forgot your password?
          </Text>
          <Text style={styles.forgotPasswordSubheading}>
            Enter your email to reset your account
          </Text>
          <InputField
            textColor={theme.colors.gray02}
            labelText='EMAIL ADDRESS'
            labelTextSize={12}
            labelColor={theme.colors.gray02}
            borderBottomColor={theme.colors.gray02}
            inputType='email'
            onChangeText={_handleEmailChange}
            inputStyle={{
              fontSize: 14,
              fontWeight: "300",
              paddingBottom: 10,
              marginBottom: theme.sizes.base
            }}
            autoFocus
            showCheckmark={isValidEmail}
          />
        </ScrollView>
        <NextArrowButton
          handleNextButton={goToNextStep}
          disabled={!isValidEmail}
        />
      </KeyboardAvoidingView>
      <Loader modalVisible={isLoading} animationType='fade' />
      {showNotification ? (
        <View style={styles.notificationWrapper}>
          <Notification
            showNotification={showNotification}
            handleCloseNotification={handleCloseNotification}
            type='Error'
            firstLine={state.errorMessage}
          />
        </View>
      ) : null}
      {isEmailSend ? (
        <View style={styles.notificationWrapper}>
          <Notification
            showNotification={isEmailSend}
            handleCloseNotification={handleCloseNotification}
            type='Sucess'
            firstLine={state.emailSendMessage}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
