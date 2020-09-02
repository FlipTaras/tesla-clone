import pageInfoReducer from "./pageInfoReducer";
import { combineReducers } from "redux";

export default combineReducers({
  page: pageInfoReducer,
});
