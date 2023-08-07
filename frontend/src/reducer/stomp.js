import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socket: null,
  client: null,
};

const stompSlice = createSlice({
  name: "stomp",
  initialState,
  reducers: {
    setStomp: (state, action) => {
      state.socket = action.payload.socket;
      state.client = action.payload.client;
    },
  },
});
export const { setStomp } = stompSlice.actions;
export default stompSlice.reducer;
