import AsyncStorage from "@react-native-community/async-storage";

const removeData = async () => {
  try {
    await AsyncStorage.removeItem("userToken");
  } catch (e) {
    // saving error
  }
};

const initalState = {
  isLoading: true,
  isSignout: false,
  userToken: null
};

export default function(state = initalState, action) {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        userToken: action.token,
        isLoading: false
      };
    case "SIGN_IN":
      return {
        ...state,
        isSignout: false,
        userToken: action.token
      };
    case "SIGN_OUT":
      removeData();
      return {
        ...state,
        isSignout: true,
        userToken: null
      };
    default:
      return state;
  }
}
