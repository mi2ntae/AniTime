const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  meetingNo: -1,
};

const shelterMeetingSlice = createSlice({
  name: "shelterMeeting",
  initialState,
  reducers: {
    setMeetingNo(state, action) {
      state.meetingNo = action.payload;
    },
  },
});

export const { setMeetingNo } = shelterMeetingSlice.actions;
export default shelterMeetingSlice.reducer;
