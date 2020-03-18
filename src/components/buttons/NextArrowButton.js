import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import { TouchableHighlight, StyleSheet, Text, View } from "react-native";
import * as theme from "../../constants/themes";

import iPhoneSize from "../../helpers/utils";

const size = iPhoneSize();
const buttonSize = 80;
const buttonWrapperPadding = 0;

if (size === "small") {
  buttonSize = 50;
  buttonWrapperPadding = 20;
}

export default class NextArrowButton extends Component {
  render() {
    const { disabled, handleNextButton } = this.props;
    const opacityStyle = disabled ? 0.2 : 0.8;
    return (
      <View style={styles.buttonWrapper}>
        <TouchableHighlight
          style={[{ opacity: opacityStyle }, styles.button]}
          onPress={handleNextButton}
          disabled={disabled}
        >
          <Icon
            name='angle-right'
            color={theme.colors.white}
            size={32}
            style={styles.icon}
          />
        </TouchableHighlight>
      </View>
    );
  }
}

NextArrowButton.propTypes = {
  disabled: PropTypes.bool,
  handleNextButton: PropTypes.func
};

const styles = StyleSheet.create({
  buttonWrapper: {
    alignItems: "flex-end",
    right: 20,
    bottom: 20,
    // position: "absolute",
    // bottom: 20,
    // right: 20,
    paddingTop: buttonWrapperPadding
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    width: buttonSize,
    height: buttonSize,
    backgroundColor: theme.colors.green02
  },
  icon: {
    marginRight: -2,
    marginTop: -2
  }
});
