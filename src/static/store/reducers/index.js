import pageInfoReducer from "./pageInfoReducer";
import modelsReducer from "./modelsReducer";
import { combineReducers } from "redux";

export default combineReducers({
  page: pageInfoReducer,
  models: modelsReducer,
});
