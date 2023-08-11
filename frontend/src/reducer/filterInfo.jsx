import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  kindType: 0,
  genderType: 0,
};

const filterInfoSlice = createSlice({
  name: "filterInfo",
  initialState,
  reducers: {
    setKindType: (state, action) => {
      state.kindType = action.payload;
    },

    setGenderType: (state, action) => {
      state.genderType = action.payload;
    },
  },
});
export const { setKindType, setGenderType } = filterInfoSlice.actions;
export default filterInfoSlice.reducer;
