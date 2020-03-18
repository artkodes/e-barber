import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import userReducer from "./reducers/userReducer";
import authReducer from "./reducers/authReducer";

// import dataReducer from "./reducers/dataReducer";

const middleware = [thunk];

const initialState = {};

const reducers = combineReducers({
  userData: userReducer,
  auth: authReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware))
);

export default store;
