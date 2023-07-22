import { createStore } from "redux";
import myReducer from ".";

const store = createStore(myReducer);
export default store;
