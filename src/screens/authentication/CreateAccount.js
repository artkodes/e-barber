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
import axios from "axios";
import {
  useDynamicStyleSheet,
  useDarkModeContext
} from "react-native-dark-mode";

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
import dynamicStyles from "../styles/CreateAccount";

//header style
import transparentHeaderStyle from "../../utils/HeaderStyle";
import { Ionicons } from "@expo/vector-icons";

const darkModeColors = {
  light: theme.colors.black4,
  dark: theme.colors.white
};

const backgroundColors = {
  light: theme.colors.white,
  dark: theme.colors.black4
};

let username, password, email, confirmPassword;

function CreateAccount({ navigation }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
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
  let token = null;
  const [state, setState] = useState({
    loading: false,
    formValid: true,
    validEmail: false,
    validPassword: false,
    errorMessage: "",
    validConfirmPassword: false
  });

  const userData = {
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    username: username
  };

  const _storeData = async () => {
    try {
      await AsyncStorage.setItem("userToken", token);
      console.log("token", token);
    } catch (error) {
      // Error saving data
    }
  };
  const dispatch = useDispatch();

  const _handleNextButton = () => {
    setState({ ...state, loading: true });
    console.log("email", email);
    let userId = null;
    axios({
      method: "post",
      url: "https://us-central1-e-barber-5189e.cloudfunctions.net/api/signup",
      data: userData
    })
      .then(res => {
        token = res.data.token;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        _storeData();
        userId = res.data.userId;
      })
      .then(() => {
        axios({
          method: "post",
          url: "https://us-central1-e-barber-5189e.cloudfunctions.net/api/user",
          data: {
            username: state.username,
            userId
          }
        })
          .then(_data => {
            dispatch({ type: "SET_USER", payload: _data.data });
            //NavigationService.navigate("Home");
            setState({ ...state, loading: false });
            console.log("_data", _data.data);
          })
          .catch(err => {
            console.log("_dataErr", err);
          });
      })
      .catch(error => {
        console.log("error", error.response);
        setState({
          ...state,
          formValid: false,
          loading: false,
          errorMessage: error.response.data
        });
      });
  };

  const _handleEmailChange = mail => {
    const { validEmail } = state;
    email = mail;
    const emailCheckRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmail) {
      if (emailCheckRegex.test(mail)) {
        setState({ ...state, validEmail: true });
      }
    } else if (!emailCheckRegex.test(mail)) {
      setState({ ...state, validEmail: false });
    }
  };

  const _handlePasswordChange = pw => {
    const { validPassword } = state;
    password = pw;
    console.log("pw", password);

    if (!validPassword) {
      if (pw.length >= 6) {
        // Password has to be at least 4 characters long
        setState({ ...state, validPassword: true });
      }
    } else if (pw.length <= 6) {
      setState({ ...state, validPassword: false });
    }
  };

  const _handleConfirmPasswordChange = pw => {
    const { validConfirmPassword } = state;
    confirmPassword = pw;
    if (!validConfirmPassword) {
      if (pw.length >= 6 && confirmPassword === password) {
        // Password has to be at least 4 characters long
        setState({ ...state, validConfirmPassword: true });
      }
    } else if (pw.length <= 6) {
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

  //dark mode
  const styles = useDynamicStyleSheet(dynamicStyles);
  const mode = useDarkModeContext();
  const darkModeColor = darkModeColors[mode];
  const backgroundColor = backgroundColors[mode];

  const showNotification = !formValid;
  const background = formValid ? backgroundColor : theme.colors.darkOrange;
  const notificationMarginTop = showNotification ? 10 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: background }}>
      <KeyboardAvoidingView
        style={[{ backgroundColor: background }, styles.wrapper]}
        behavior='padding'
      >
        <ScrollView style={[styles.scrollView, { marginTop: 40 }]}>
          <Text style={styles.heading}>Create account</Text>
          <Typography
            light
            style={{ marginLeft: 20, marginTop: 10, color: darkModeColor }}
          >
            This allow us to peronalise your experience.
          </Typography>
          <View style={styles.content}>
            <View style={styles.inputWrapper}>
              <InputField
                labelText='Username'
                labelTextSize={16}
                labelTextWeight='400'
                labelColor={theme.colors.gray02}
                textColor={theme.colors.gray02}
                borderBottomColor={theme.colors.gray02}
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
                labelColor={theme.colors.gray02}
                textColor={theme.colors.gray02}
                borderBottomColor={theme.colors.gray02}
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
                labelColor={theme.colors.gray02}
                textColor={theme.colors.gray02}
                borderBottomColor={theme.colors.gray02}
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
                labelColor={theme.colors.gray02}
                textColor={theme.colors.gray02}
                borderBottomColor={theme.colors.gray02}
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
              <Typography
                h3
                style={{
                  marginLeft: 20,
                  marginBottom: 10,
                  color: darkModeColor
                }}
              >
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
                  marginRight: 20,
                  color: darkModeColor
                }}
              >
                By continuing, you confirm you have read our
                {
                  <Typography bold style={{ color: darkModeColor }}>
                    {" "}
                    Privacy Policy.
                  </Typography>
                }
              </Typography>
            </View>
          </View>
          <NextArrowButton
            handleNextButton={_handleNextButton}
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
