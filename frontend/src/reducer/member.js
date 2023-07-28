import { createSlice } from "@reduxjs/toolkit";

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
      state.memberNo = action.payload.memberNo;
      state.name = action.payload.name;
      state.memberKind = action.payload.memberKind;
      state.snsCheck = action.payload.snsCheck;
    },
  },
});

export const { setMember } = memberSlice.actions;
export default memberSlice.reducer;
