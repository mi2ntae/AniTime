import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inputAnimal: "animal",
  inputGender: "gender",
  kindType: 0,
  genderType: 0,
};

const filterInfoSlice = createSlice({
  name: "filterInfo",
  initialState,
  reducers: {
    setInputAnimal: (state, action) => {
      state.inputAnimal = action.payload;
    },
    setInputGender: (state, action) => {
      state.inputGender = action.payload;
    },
    setKindType: (state, action) => {
      state.kindType = action.payload;
    },
    setGenderType: (state, action) => {
      state.genderType = action.payload;
    },
  },
});
export const { setKindType, setGenderType, setInputAnimal, setInputGender } =
  filterInfoSlice.actions;
export default filterInfoSlice.reducer;
