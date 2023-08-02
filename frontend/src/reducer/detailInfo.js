const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  desertionNo: 0,
  profileNo: 0,
};

const detailInfoSlice = createSlice({
  name: "detailInfo",
  initialState,
  reducers: {
    setDesertionNo(state, action) {
      state.desertionNo = action.payload;
    },
    setProfileNo(state, action) {
      state.profileNo = action.payload;
    },
  },
});

export let { setDesertionNo, setProfileNo } = detailInfoSlice.actions;
export default detailInfoSlice.reducer;
