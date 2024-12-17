import { configureStore } from "@reduxjs/toolkit";
import timeControlReducer from "./features/timeControl/timeControlSlice";

const store = configureStore({
  reducer: {
    timeControl: timeControlReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
