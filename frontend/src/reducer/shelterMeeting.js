const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  meetingNo: -1,
  reload: true,
};

const shelterMeetingSlice = createSlice({
  name: "shelterMeeting",
  initialState,
  reducers: {
    setMeetingNo(state, action) {
      state.meetingNo = action.payload;
    },
    setReload(state, action) {
      state.reload = action.payload;
    },
  },
});

export const { setMeetingNo, setReload } = shelterMeetingSlice.actions;
export default shelterMeetingSlice.reducer;
