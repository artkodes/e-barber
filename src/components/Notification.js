import React, { Component } from "react";
import { PropTypes } from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Easing,
  Animated
} from "react-native";
import * as theme from "../constants/themes";

export default class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positionValue: new Animated.Value(-60)
    };
    this._closeNotification = this._closeNotification.bind(this);
    this._animateNotification = this._animateNotification.bind(this);
  }

  _animateNotification(value) {
    const { positionValue } = this.state;
    Animated.timing(positionValue, {
      toValue: value,
      duration: 300,
      velocity: 3,
      tension: 2,
      friction: 8,
      easing: Easing.easeOutBack
    }).start();
  }

  _closeNotification() {
    this.props.handleCloseNotification();
  }

  render() {
    const { type, firstLine, secondLine, showNotification } = this.props;
    showNotification
      ? this._animateNotification(0)
      : this._animateNotification(-60);
    const { positionValue } = this.state;
    return (
      <Animated.View style={[{ marginBottom: positionValue }, styles.wrapper]}>
        <View style={styles.errorMessageContainer}>
          <View style={styles.errorMessage}>
            <Text style={styles.errorText}>{type}</Text>
            <Text>{firstLine}</Text>
          </View>
          <Text style={styles.errorMessage}>{secondLine}</Text>
        </View>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this._closeNotification}
        >
          <Icon name='times' size={25} color={theme.colors.lightGray} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

Notification.propTypes = {
  showNotification: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  firstLine: PropTypes.string,
  secondLine: PropTypes.string,
  handleCloseNotification: PropTypes.func
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: theme.colors.white,
    height: 200,
    padding: 10
  },
  notificationContent: {
    flex: 1,
    flexDirection: "column",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  errorText: {
    color: theme.colors.darkOrange,
    marginRight: 5,
    fontSize: 25,
    marginBottom: 2
  },
  errorMessage: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 2,
    fontSize: 20
  },
  errorMessageContainer: {
    flexDirection: "row",
    flex: 1,
    marginBottom: 2
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 999
  }
});
