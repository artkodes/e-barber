import { DynamicStyleSheet, DynamicValue } from "react-native-dark-mode";
import * as theme from "../../constants/themes";

const dynamicStyle = new DynamicStyleSheet({
  wrapper: {
    display: "flex",
    flex: 1
  },
  content: {
    paddingTop: 30
  },

  closeButton: {
    position: "absolute",
    left: 20,
    zIndex: 9999
  },
  headerStyle: {
    backgroundColor: theme.colors.black,
    borderBottomWidth: 0
  },
  heading: {
    fontSize: 30,
    fontWeight: "300",
    color: new DynamicValue(theme.colors.black, theme.colors.white),
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    textTransform: "uppercase"
  },
  privacyOptions: {
    marginTop: 20
  },
  privacyHeading: {
    fontSize: 16,
    fontWeight: "200",
    color: new DynamicValue(theme.colors.black, theme.colors.white),
    marginBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign: "justify"
  },
  privacyOptionItem: {
    flex: 1,
    padding: 20
  },
  privacyOptionTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: new DynamicValue(theme.colors.black, theme.colors.white)
  },
  privacyOptionDescription: {
    fontSize: 14,
    fontWeight: "200",
    color: new DynamicValue(theme.colors.black, theme.colors.white),
    marginTop: 10,
    paddingRight: 90
  },
  privacyRadioInput: {
    position: "absolute",
    top: 0,
    right: 0
  },
  inputWrapper: {
    paddingLeft: 20,
    paddingRight: 20
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray06,
    height: 1,
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 10,
    width: 110,
    marginTop: 30
  },
  buttonIcon: {
    position: "absolute",
    right: 0,
    top: "50%",
    marginTop: -16
  }
});

export default dynamicStyle;
