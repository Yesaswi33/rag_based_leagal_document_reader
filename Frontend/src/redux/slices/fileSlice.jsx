import { createSlice } from "@reduxjs/toolkit";

const filenameSlice = createSlice({
  name: "filename",
  initialState: {
    value: "",
  },
  reducers: {
    setFilename: (state, action) => {
      state.value = action.payload;
      console.log("redux state: ", state.value);
    },
  },
});

export const { setFilename } = filenameSlice.actions;
export default filenameSlice.reducer;
