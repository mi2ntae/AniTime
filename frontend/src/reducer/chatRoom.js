import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomNo: -1,
  name: "",
};

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.roomNo = action.payload.roomNo;
      state.name = action.payload.name;
    },
  },
});
export const { setRoom } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
