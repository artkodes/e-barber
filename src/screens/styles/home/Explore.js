import { DynamicStyleSheet, DynamicValue } from "react-native-dark-mode";
import iPhoneSize from "../../../helpers/utils";
import * as theme from "../../../constants/themes";

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
    backgroundColor: new DynamicValue(theme.colors.white, theme.colors.black4)
  },
  header: {
    display: "flex",
    flexDirection: "row",
    padding: theme.sizes.base,
    justifyContent: "space-between",
    alignItems: "center"
    //marginTop: theme.sizes.base
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
  },
  searchBar: {
    backgroundColor: "transparent",
    width: "100%",
    height: 50,
    zIndex: 99
    //marginTop: 20
  },
  searchContainer: {
    display: "flex",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: new DynamicValue(
      theme.colors.gray05,
      theme.colors.grayScale
    ),
    shadowColor: "rgba(0,0,0,0.1)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    borderRadius: 8,
    height: 40,
    marginLeft: theme.sizes.base,
    marginRight: theme.sizes.base
  },
  searchIcon: {
    position: "absolute",
    right: 18,
    top: 9
  },
  textInput: {
    display: "flex",
    marginTop: 11,
    marginLeft: theme.sizes.base,
    color: theme.colors.gray02
  },
  text: {
    color: new DynamicValue("black", "white")
  }
});

export default dynamicStyles;
