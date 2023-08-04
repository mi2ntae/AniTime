const { createSlice } = require("@reduxjs/toolkit");

const reservedDate = createSlice({
  name: "reservedDate",
  initialState: { date: "", time: "" },
  reducers: {
    setReservedDate(state, action) {
      state.date = action.payload.date;
      state.time = action.payload.time;
    },
  },
});

export const { setReservedDate } = reservedDate.actions;
export default reservedDate.reducer;
