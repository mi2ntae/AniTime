import { combineReducers } from "redux";
import memberReducer from "./reducer/member";
import detailInfoReducer from "./reducer/detailInfo";
import shelterMeetingReducer from "./reducer/shelterMeeting";
import storageSession from "redux-persist/lib/storage/session";
import persistReducer from "redux-persist/es/persistReducer";
import reservedDateReducer from "./reducer/reservation";
import filterInfoReducer from "reducer/filterInfo";
import chatRoomReducer from "reducer/chatRoom";
import sortInfoReducer from "reducer/sortInfo";
import stompReducer from "reducer/stomp";

const persistConfig = {
  key: "root",
  storage: storageSession,
  whitelist: ["member", "detailInfo"],
};

const rootReducer = combineReducers({
  member: memberReducer,
  detailInfo: detailInfoReducer,
  shelterMeeting: shelterMeetingReducer,
  reservedDate: reservedDateReducer,
  filterInfo: filterInfoReducer,
  chatRoom: chatRoomReducer,
  sortInfo: sortInfoReducer,
  stomp: stompReducer,
  // 필요한거 더 추가하세요
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
