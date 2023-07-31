import { configureStore, createSlice } from "@reduxjs/toolkit";
import rootReducer from "./reducer.js";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;
