import React, { useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TextInput,
  ScrollView,
  TouchableOpacity,
  NativeModules,
  Platform,
  StatusBar
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps

import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-community/async-storage";
import { useSelector, useDispatch } from "react-redux";
import Geolocation from "@react-native-community/geolocation";

import axios from "axios";
import opencage from "opencage-api-client";

import {
  useDynamicStyleSheet,
  useDarkModeContext
} from "react-native-dark-mode";

import { openCageApi } from "../../api/apiKey";
import { Ionicons, EvilIcons } from "@expo/vector-icons";

//stylesheet
import dynamicStyles from "../styles/home/Explore";
import * as theme from "../../constants/themes";
import Text from "../../components/Typography";
import ArroundYou from "../../components/explore/ArroundYou";

const { width, height } = Dimensions.get("window");

const darkModeColors = {
  light: theme.colors.black,
  dark: theme.colors.white
};

const Explore = props => {
  const animatedScrollYValue = useRef(new Animated.Value(0)).current;
  const startHeaderHeight = 80;
  const endHeaderHeight = 50;

  React.useEffect(() => {
    getPosition();
    console.log("bar", StatusBar.contextType);
  }, [position, elPosition]);

  const animatedHeaderHeight = animatedScrollYValue.interpolate({
    inputRange: [0, 50],
    outputRange: [startHeaderHeight, endHeaderHeight],
    extrapolate: "clamp"
  });

  const animatedOpacity = animatedHeaderHeight.interpolate({
    inputRange: [endHeaderHeight, startHeaderHeight],
    outputRange: [0, 1],
    extrapolate: "clamp"
  });
  const animatedTagTop = animatedHeaderHeight.interpolate({
    inputRange: [endHeaderHeight, startHeaderHeight],
    outputRange: [-30, 10],
    extrapolate: "clamp"
  });
  const animatedMarginTop = animatedHeaderHeight.interpolate({
    inputRange: [0, startHeaderHeight],
    outputRange: [-170, 20],
    extrapolate: "clamp"
  });

  //opencage api
  const key = openCageApi;
  //state
  const [elPosition, setElPosition] = useState(null);
  const [error, setError] = useState("");
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  });
  const [city, setCity] = useState("");

  const getPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setError("");
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        });
        opencage
          .geocode({
            key,
            q: `${pos.coords.latitude},${pos.coords.longitude}`,
            language: "fr"
          })
          .then(data => {
            // console.log(JSON.stringify(data));
            if (data.status.code == 200) {
              if (data.results.length > 0) {
                var place = data.results[0];
                setCity(place.components.road);
                // console.log(place.formatted);
                // console.log(place.components.road);
                // console.log(place.annotations.timezone.name);
              }
            } else if (data.status.code == 402) {
              console.log("hit free-trial daily limit");
              console.log(
                "become a customer: https://opencagedata.com/pricing"
              );
            } else {
              // other possible response codes:
              // https://opencagedata.com/api#codes
              console.log("error", data.status.message);
            }
          })
          .catch(error => {
            console.log("error", error.message);
          });
      },
      e => setError(e.message)
    );
  };

  //redux
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const storeData = async () => {
    try {
      await AsyncStorage.setItem("userToken", "stored value");
    } catch (e) {
      // saving error
    }
  };

  // const handleScroll =  (event) => {
  //   console.log(event.nativeEvent.contentOffset.y);
  //  },

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setElPosition(scrollPosition);
    Animated.event([
      { nativeEvent: { contentOffset: { y: animatedScrollYValue } } }
    ]);
    console.log(animatedScrollYValue);
  };

  //dark mode
  const styles = useDynamicStyleSheet(dynamicStyles);
  const mode = useDarkModeContext();
  const darkModeColor = darkModeColors[mode];

  const header = () => {
    return (
      <View style={styles.header}>
        <Ionicons name='ios-search' size={14} color='red' />
      </View>
    );
  };

  //   setInterval(() => {
  //     storeData();
  //   }, 3000);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={{ flex: 0.2 }}>
        <Animated.View
          style={{
            height: animatedHeaderHeight
          }}
        >
          <Animated.View
            style={[
              styles.header,
              { opacity: animatedOpacity, top: animatedTagTop }
            ]}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <EvilIcons name='location' size={30} color='red' />
              <View style={{ marginLeft: theme.sizes.base * 0.2 }}>
                <Text caption>Location</Text>
                <Text style={styles.text} paragraph size={13}>
                  {city}
                </Text>
              </View>
            </View>
            <EvilIcons name='gear' size={30} color={darkModeColor} />
          </Animated.View>

          <TouchableOpacity style={[styles.searchBar]}>
            <Animated.View
              style={[styles.searchContainer, { marginTop: animatedMarginTop }]}
            >
              <TextInput
                style={styles.textInput}
                placeholder='Try Cape Town..'
              />
              <Ionicons
                name='ios-search'
                size={20}
                color={theme.colors.gray02}
                style={styles.searchIcon}
              />
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { y: animatedScrollYValue } } }
        ])}
      >
        <ArroundYou position={position} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Explore;
