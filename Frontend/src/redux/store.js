import { configureStore } from "@reduxjs/toolkit";
import filenameReducer from "./slices/fileSlice";

const store = configureStore({
  reducer: {
    filename: filenameReducer,
  },
});

export default store;
