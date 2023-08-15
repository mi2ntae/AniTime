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
    setShelterNo(state, action) {
      state.shelterNo = action.payload;
    },
    setComponent(state,action){
      state.isProfile=action.payload;
    }
  },
});

export let { setDesertionNo, setProfileNo, setShelterNo,setComponent } =
  detailInfoSlice.actions;
export default detailInfoSlice.reducer;
