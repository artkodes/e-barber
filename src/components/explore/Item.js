import React, { useEffect, useState } from "react";
import { View, Image, TouchableWithoutFeedback } from "react-native";
import Text from "../Typography";

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet
} from "react-native-dark-mode";
import opencage from "opencage-api-client";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import * as theme from "../../constants/themes";
const Item = props => {
  useEffect(() => {
    geoCodToAdress();
  }, []);
  const { barber, position } = props;
  const styles = useDynamicStyleSheet(dynamicStyles);
  const [address, setAddress] = useState("");

  const geoCodToAdress = () => {
    const key = "55445bc3223e4f9580f2cd0bcbacd913";
    opencage
      .geocode({
        key,
        q: `${barber.coords.lat},${barber.coords.long}`,
        language: "fr"
      })
      .then(data => {
        if (data.status.code == 200) {
          if (data.results.length > 0) {
            var place = data.results[0];
            setAddress(place.formatted);
          }
        } else if (data.status.code == 402) {
          console.log("hit free-trial daily limit");
          console.log("become a customer: https://opencagedata.com/pricing");
        } else {
          // other possible response codes:
          // https://opencagedata.com/api#codes
          console.log("error", data.status.message);
        }
      })
      .catch(error => {
        console.log("error", error.message);
      });
  };
  return (
    <TouchableWithoutFeedback key={`barber-${barber.id}`}>
      <View style={styles.container}>
        <View style={{ flex: 2 }}>
          <Image source={{ uri: barber.image }} style={styles.image} />
        </View>

        <View style={{ flex: 1, paddingTop: 15 }}>
          <Text style={styles.text} paragraph transform='capitalize'>
            {barber.title.trim()}
          </Text>
          <Text color={theme.colors.red} caption>
            at {barber.distance} meters{" "}
          </Text>
          <View
            style={{
              marginTop: theme.sizes.base
            }}
          >
            {/* <EvilIcons name='location' size={20} color='red' /> */}
            <Text size={10} caption>
              {address.split(",")[0]},
            </Text>
            <Text size={10} caption>
              {address.split(",")[1] != undefined
                ? address.split(",")[1].trim()
                : null}
              .
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    height: 230,
    margin: 10,
    width: 200
  },
  text: {
    color: new DynamicValue("black", "white")
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    borderRadius: 10
  }
});

export default Item;
