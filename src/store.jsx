import { configureStore } from "@reduxjs/toolkit";
import CitySlice from "./Redux/city";
export const store = configureStore({
  reducer: {
    CitySlice: CitySlice,
  },
});
