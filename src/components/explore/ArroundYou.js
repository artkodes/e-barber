import React from "react";
import { View, ScrollView } from "react-native";
import Item from "./Item";

import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicStyleSheet
} from "react-native-dark-mode";

import * as geolib from "geolib";

import * as theme from "../../constants/themes";
import Text from "../Typography";

const data = [
  {
    title: "artkodes",
    id: "1",
    image:
      "https://images.unsplash.com/photo-1534778356534-d3d45b6df1da?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    coords: {
      lat: "45.664130",
      long: "4.956500"
    }
  },
  {
    title: "fenty",
    id: "2",
    image:
      "https://images.unsplash.com/photo-1559453252-1634e4c59f20?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80",
    coords: {
      lat: "45.666840",
      long: "4.949750"
    }
  },
  {
    title: "artkodes",
    id: "3",
    image:
      "https://images.unsplash.com/photo-1522123436910-416191f97bfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    coords: {
      lat: "45.661924",
      long: "4.943848"
    }
  }
];

const ArroundYou = props => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const coords = [];
  const barbers = [];

  for (let i = 0; i < data.length; i++) {
    coords.push({
      latitude: data[i].coords.lat,
      longitude: data[i].coords.long
    });
    // console.log(
    //   data[i].title,
    //   "You are ",
    //   geolib.getDistance(props.position, {
    //     latitude: data[i].coords.lat,
    //     longitude: data[i].coords.long
    //   }),
    //   "meters away from ",
    //   props.position
    // );

    let distance = geolib.getDistance(props.position, {
      latitude: data[i].coords.lat,
      longitude: data[i].coords.long
    });

    if (distance <= 3000) {
      data[i].distance = distance;
      barbers.push(data[i]);
      //console.log('"good', barbers);
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.text} h3 bold>
          Nearby
        </Text>
        <Text caption>show all</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {barbers.map(barber => (
          <Item position={props.position} key={barber.id} barber={barber} />
        ))}
      </ScrollView>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.sizes.base,
    marginTop: theme.sizes.base * 6,
    marginBottom: theme.sizes.base
  },
  text: {
    color: new DynamicValue("black", "white")
  }
});

export default ArroundYou;
