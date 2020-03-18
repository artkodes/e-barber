// In App.js in a new project

import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import { View, Text } from "react-native";
//header style
import transparentHeaderStyle from "../src/utils/HeaderStyle";

//components
import Loader from "../src/components/Loader";

//screens
import OnBoarding from "../src/screens/onboarding";
import CreateAccountScreen from "../src/screens/authentication/CreateAccount";
import LoginScreen from "../src/screens/authentication/Login";
import ForgotPasswordScreen from "../src/screens/authentication/ForgotPassword";

//redux
import { useSelector, useDispatch } from "react-redux";

const Stack = createStackNavigator();

function AppNavigator({ navigation }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let token;

      try {
        token = await AsyncStorage.getItem("userToken");
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: "RESTORE_TOKEN", token: token });
    };

    bootstrapAsync();
  }, [auth.isLoading, auth.userToken]);

  if (auth.isLoading) {
    // We haven't finished checking for the token yet
    return <Loader modalVisible={auth.isLoading} animationType='fade' />;
  }

  return (
    <Stack.Navigator>
      {auth.userToken == null ? (
        // No token found, user isn't signed in
        <>
          <Stack.Screen
            name='OnBoarding'
            component={OnBoarding}
            options={{
              title: null
            }}
          />
          <Stack.Screen
            name='LoginScreen'
            component={LoginScreen}
            options={{
              title: null,
              // When logging out, a pop animation feels intuitive
              // You can remove this if you want the default 'push' animation
              animationTypeForReplace: auth.isSignout ? "pop" : "push"
            }}
          />
          <Stack.Screen
            name='CreateAccount'
            component={CreateAccountScreen}
            options={{
              title: null
            }}
          />
          <Stack.Screen
            name='ForgotPassword'
            component={ForgotPasswordScreen}
            options={{
              title: null
            }}
          />
        </>
      ) : (
        // User is signed in
        <Stack.Screen
          name='OnBoarding'
          component={OnBoarding}
          options={{
            headerStyle: transparentHeaderStyle,
            headerTransparent: true,
            title: null
          }}
        />
      )}
    </Stack.Navigator>
  );
}

export default AppNavigator;
