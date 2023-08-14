import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomNo: -1,
  name: "",
  sub: false,
};

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.roomNo = action.payload.roomNo;
      state.name = action.payload.name;
    },
    setSub: (state, action) => {
      state.sub = action.payload;
    },
  },
});
export const { setRoom, setSub } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
