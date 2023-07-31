import { createSlice } from "@reduxjs/toolkit";
import { http } from "../api/commonHttp.js";

const initialState = {
  token: "",
  memberNo: -1,
  name: "",
  memberKind: -1,
  snsCheck: false,
};

const memberSlice = createSlice({
  name: "member",
  initialState,
  reducers: {
    setMember: (state, action) => {
      state.token = action.payload.token;
      state.memberNo = action.payload.member.memberNo;
      state.name = action.payload.member.name;
      state.memberKind = action.payload.member.memberKind;
      state.snsCheck = action.payload.member.snsCheck;
    },
  },
});

export const { setMember } = memberSlice.actions;
export default memberSlice.reducer;
