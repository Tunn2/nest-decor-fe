import { combineReducers } from "redux";
import authReducer from "./features/authSlice";
import cartReducer from "./features/cartSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
