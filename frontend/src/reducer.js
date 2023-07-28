import { combineReducers } from "redux";
import memberReducer from "./reducer/member";

const rootReducer = combineReducers({
  member: memberReducer,
});

export default rootReducer;
