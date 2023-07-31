const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    desertionNo: 0,
    profileNo: 0,
}

const detailInfoSlice = createSlice({
    name: "detailInfo",
    initialState,
});

export default detailInfoSlice.reducer;