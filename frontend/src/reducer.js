import { combineReducers } from "redux";
import memberReducer from "./reducer/member";
import detailInfoReducer from "./reducer/detailInfo";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["member", "detailInfo"],
};

const rootReducer = combineReducers({
  member: memberReducer,
  detailInfo: detailInfoReducer,
  // 필요한거 더 추가하세요
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
