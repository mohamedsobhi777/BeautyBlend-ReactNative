import { combineReducers } from "redux";
import feedReducer from "./feedsReducers";
import cartReducer from "./cartReducer";

const myReducer = combineReducers({
    feeds: feedReducer,
    cartItems: cartReducer,
});

export default myReducer;
