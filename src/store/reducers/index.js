import { combineReducers } from "redux";
import cartReducer from "./cart";
import userReducer from "./user";

const reducers = combineReducers({
  cart: cartReducer,
  user: userReducer
});

export default reducers;
