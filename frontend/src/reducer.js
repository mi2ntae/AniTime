import { combineReducers } from "redux";
import memberReducer from "./reducer/member";

const rootReducer = combineReducers({
  member: memberReducer,
  // 필요한 거 더 추가하세요
});

export default rootReducer;
