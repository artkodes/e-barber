import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  KeyboardAvoidingView,
  AsyncStorage,
  Button
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

//components
import InputField from "../../components/form/InputField";
import RadioInput from "../../components/form/RadioInput";
import Notification from "../../components/Notification";
import NextArrowButton from "../../components/buttons/NextArrowButton";
import Loader from "../../components/Loader";
import Typography from "../../components/Typography";
import NavBarButton from "../../components/buttons/NavBarButton";

//constants
import * as theme from "../../constants/themes";
import styles from "../styles/CreateList";

//header style
import transparentHeaderStyle from "../../utils/HeaderStyle";
import { Ionicons } from "@expo/vector-icons";

function CreateAccount({ navigation }) {
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
    loading: false,
    image: "null",
    formValid: true,
    validEmail: false,
    validPassword: false,
    personal_information: false,
    errorMessage: "",
    validConfirmPassword: false,
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    emailAddress: "",
    type: ""
  });

  const _handleEmailChange = email => {
    const { validEmail } = state;
    setState({ ...state, emailAddress: email });
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmail) {
      if (emailCheckRegex.test(email)) {
        setState({ ...state, validEmail: true });
      }
    } else if (!emailCheckRegex.test(email)) {
      setState({ ...state, validEmail: false });
    }
  };

  const _handlePasswordChange = password => {
    const { validPassword } = state;
    setState({ ...state, password: password });
    console.log("pw", state.password);

    if (!validPassword) {
      if (password.length >= 6) {
        // Password has to be at least 4 characters long
        setState({ ...state, validPassword: true });
      }
    } else if (password.length <= 6) {
      setState({ ...state, validPassword: false });
    }
  };

  const _handleConfirmPasswordChange = password => {
    const { validConfirmPassword } = state;
    setState({ ...state, confirmPassword: password });

    if (!validConfirmPassword) {
      if (password.length >= 6 && state.confirmPassword === state.password) {
        // Password has to be at least 4 characters long
        setState({ ...state, validConfirmPassword: true });
      }
    } else if (password.length <= 6) {
      setState({ ...state, validConfirmPassword: false });
    }
  };

  const _toggleNextButtonState = () => {
    const { validEmail, validPassword, validConfirmPassword, image } = state;

    if (validEmail && validPassword && validConfirmPassword) {
      return false;
    }

    return true;
  };

  const { loading, formValid, validPassword, privacyOption } = state;

  const showNotification = !formValid;
  const background = formValid ? theme.colors.white : theme.colors.darkOrange;
  const notificationMarginTop = showNotification ? 10 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior='padding'
      >
        <ScrollView style={[styles.scrollView, { marginTop: 40 }]}>
          <Text style={styles.heading}>Create account</Text>
          <Typography light style={{ marginLeft: 20, marginTop: 10 }}>
            This allow us to peronalise your experience.
          </Typography>
          <View style={styles.content}>
            <View style={styles.inputWrapper}>
              <InputField
                labelText='Username'
                labelTextSize={16}
                labelTextWeight='400'
                labelColor={theme.colors.lightBlack}
                textColor={theme.colors.lightBlack}
                borderBottomColor={theme.colors.gray06}
                inputType='text'
                inputStyle={{
                  fontSize: 18,
                  fontWeight: "400",
                  paddingBottom: theme.sizes.base,
                  marginBottom: theme.sizes.base
                }}
                onChangeText={text => {
                  setState({ ...state, username: text });
                }}
                showCheckmark={false}
              />
              <InputField
                labelText='Email'
                labelTextSize={16}
                labelTextWeight='400'
                labelColor={theme.colors.lightBlack}
                textColor={theme.colors.lightBlack}
                borderBottomColor={theme.colors.gray06}
                inputType='email'
                inputStyle={{
                  fontSize: 18,
                  fontWeight: "400",
                  paddingBottom: theme.sizes.base,
                  marginBottom: theme.sizes.base
                }}
                onChangeText={_handleEmailChange}
                showCheckmark={state.validEmail}
              />
              <InputField
                labelText='Password'
                labelTextSize={16}
                labelTextWeight='400'
                labelColor={theme.colors.lightBlack}
                textColor={theme.colors.lightBlack}
                borderBottomColor={theme.colors.gray06}
                inputType='password'
                inputStyle={{
                  fontSize: 18,
                  fontWeight: "400",
                  paddingBottom: theme.sizes.base,
                  marginBottom: theme.sizes.base
                }}
                onChangeText={_handlePasswordChange}
                showCheckmark={state.validPassword}
              />

              <InputField
                labelText='Confirm password'
                labelTextSize={16}
                labelTextWeight='400'
                labelColor={theme.colors.lightBlack}
                textColor={theme.colors.lightBlack}
                borderBottomColor={theme.colors.gray06}
                inputType='password'
                inputStyle={{
                  fontSize: 18,
                  fontWeight: "400",
                  paddingBottom: theme.sizes.base,
                  marginBottom: theme.sizes.base
                }}
                onChangeText={_handleConfirmPasswordChange}
                showCheckmark={state.validConfirmPassword}
              />
            </View>

            <View style={[styles.privacyOptions, { marginBottom: 40 }]}>
              <Typography h3 style={{ marginLeft: 20, marginBottom: 10 }}>
                Privacy Policy
              </Typography>

              <Typography light style={[styles.privacyHeading]}>
                Artkodes is committed to respecting your privacy and complying
                with applicable laws and regulations to ensure that the personal
                information you give us is kept appropriately secure and
                processed fairly and lawfully.
              </Typography>

              <Typography
                style={{
                  marginLeft: 20,
                  textAlign: "justify",
                  marginTop: 20,
                  marginRight: 20
                }}
              >
                By continuing, you confirm you have read our
                {<Typography bold> Privacy Policy.</Typography>}
              </Typography>
            </View>
          </View>
          <NextArrowButton
            // handleNextButton={_handleNextButton}
            disabled={_toggleNextButtonState()}
          />
        </ScrollView>
      </KeyboardAvoidingView>
      <Loader modalVisible={loading} animationType='fade' />

      {state.formValid ? null : (
        <View
          style={[
            {
              marginTop: notificationMarginTop,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0
            }
          ]}
        >
          <Notification
            showNotification={showNotification}
            handleCloseNotification={() => {
              setState({ ...state, formValid: true });
            }}
            type='Error'
            firstLine={state.errorMessage.general}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default CreateAccount;
