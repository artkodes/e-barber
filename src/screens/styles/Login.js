import { DynamicStyleSheet, DynamicValue } from "react-native-dark-mode";
import iPhoneSize from "../../helpers/utils";

import * as theme from "../../constants/themes";

let headingTextSize = 30;
if (iPhoneSize() === "small") {
  headingTextSize = 26;
}

const dynamicStyles = new DynamicStyleSheet({
  wrapper: {
    display: "flex",
    flex: 1
  },
  scrollViewWrapper: {
    marginTop: 190,
    flex: 1,
    padding: 0,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0
  },
  scrollView: {
    marginTop: 70,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1
  },
  loginHeader: {
    fontSize: headingTextSize,
    color: new DynamicValue(theme.colors.black, theme.colors.white),
    fontWeight: "300",
    marginBottom: 10,
    textTransform: "uppercase"
  },
  notificationWrapper: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default dynamicStyles;
