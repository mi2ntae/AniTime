import { combineReducers } from "redux";
import memberReducer from "./reducer/member";
import detailInfoReducer from "./reducer/detailInfo";

const rootReducer = combineReducers({
  member: memberReducer,
  detailInfo: detailInfoReducer,
  // 필요한거 더 추가하세요
});

export default rootReducer;
