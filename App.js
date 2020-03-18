import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

//redux
import { Provider } from "react-redux";
import store from "./src/redux/store";

//react navigation
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import AppNavigator from "./navigation/AppNavigator";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <View style={{ flex: 1 }}>
              <AppNavigator />
            </View>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    );
  }
}
