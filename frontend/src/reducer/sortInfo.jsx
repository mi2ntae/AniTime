import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  descClicked: false,
  ascClicked: false,
  sortSelected: "정렬",
  sortType: 0,
};

const sortInfoSlice = createSlice({
  name: "sortInfo",
  initialState,
  reducers: {
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    setSortSelected: (state,action)=>{
        state.sortSelected = action.payload;
    },
    setDescClicked: (state,action)=>{
        state.descClicked = action.payload;
    },
    setAscClicked: (state,action)=>{
        state.ascClicked= action.payload;
    }
  },
});
export const {setSortType,setSortSelected,setDescClicked,setAscClicked} =
  sortInfoSlice.actions;
export default sortInfoSlice.reducer;
