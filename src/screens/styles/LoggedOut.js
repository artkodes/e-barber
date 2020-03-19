import { StyleSheet } from "react-native";
import iPhoneSize from "../../helpers/utils";
import * as theme from "../../constants/themes";

import { DynamicStyleSheet, DynamicValue } from "react-native-dark-mode";

let termsTextSize = 13;
let headingTextSize = 30;
if (iPhoneSize() === "small") {
  termsTextSize = 12;
  headingTextSize = 26;
}

const dynamicStyles = new DynamicStyleSheet({
  wrapper: {
    flex: 1,
    display: "flex",
    backgroundColor: new DynamicValue(theme.colors.white, "black")
  },
  welcomeWrapper: {
    flex: 1,
    display: "flex",
    marginTop: 30,
    padding: 20,
    justifyContent: "flex-end"
  },
  logo: {
    width: 200,
    height: 200,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 70
  },
  welcomeText: {
    fontSize: headingTextSize,
    color: new DynamicValue(theme.colors.black, theme.colors.white),
    fontWeight: "300",
    marginBottom: 40
  },
  facebookButtonIcon: {
    color: new DynamicValue(theme.colors.black, theme.colors.white),
    position: "relative",
    left: 20,
    zIndex: 8
  },
  moreOptionsButton: {
    marginTop: 10
  },
  moreOptionsButtonText: {
    color: new DynamicValue(theme.colors.black, theme.colors.white),
    fontSize: 16
  },
  termsAndConditions: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
    marginTop: 30
  },
  termsText: {
    color: new DynamicValue(theme.colors.black, theme.colors.white),
    fontSize: termsTextSize,
    fontWeight: "600"
  },
  linkButton: {
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(theme.colors.black, theme.colors.white)
  }
});

export default dynamicStyles;
