const initalState = {
  authenticated: false,
  credentials: {},
  likes: [],
  notifications: []
};

export default function(state = initalState, action) {
  switch (action.type) {
    case "SET_AUTHENTICATED":
      return { ...state, authenticated: true };
    case "SET_UNAUTHENTICATED":
      return initalState;
    case "SET_USER":
      return { authenticated: true, ...action.payload };
    default:
      return state;
  }
}
