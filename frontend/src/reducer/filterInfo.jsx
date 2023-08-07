import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dogChecked: true,
  catChecked: true,
  femaleChecked: true,
  maleChecked: true,
  kindType: 0,
  genderType: 0,
  sortType: 0,
};

const filterInfoSlice = createSlice({
  name: "filterInfo",
  initialState,
  reducers: {
    setDogChecked: (state, action) =>{
      state.dogChecked = action.payload;
    },
    setCatChecked: (state, action) =>{
      state.catChecked = action.payload;
    },
    setKindType: (state, action) => {
      state.kindType = action.payload;
    },
    setFemaleChecked: (state, action) =>{
      state.femaleChecked = action.payload;
    },
    setMaleChecked: (state, action) =>{
      state.maleChecked = action.payload;
    },
    setGenderType: (state, action) => {
      state.genderType = action.payload;
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
    resetFilter: (state) => {
      state.kindType = 0;
      state.genderType = 0;
      state.sortType = 0;
    },
  },
});
export const {setDogChecked,setCatChecked, setKindType,  setFemaleChecked, setMaleChecked, setGenderType, setSortType, resetFilter } =
  filterInfoSlice.actions;
export default filterInfoSlice.reducer;
