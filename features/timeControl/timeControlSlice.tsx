import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  current: "session",
  countDown: "25:00",
  playing: false,
};

const timeControlSlice = createSlice({
  name: "timeControl",
  initialState,
  reducers: {
    incrementBreakLength: (state) => {
      state.breakLength += 1;
    },
    decrementBreakLength: (state) => {
      if (state.breakLength > 1) {
        state.breakLength -= 1;
      }
    },
    incrementSessionLength: (state) => {
      state.sessionLength += 1;
    },
    decrementSessionLength: (state) => {
      if (state.sessionLength > 1) {
        state.sessionLength -= 1;
      }
    },
    resetTimeLengths: (state) => {
      state.breakLength = 5;
      state.sessionLength = 25;
    },
    updateClockTime: (state) => {
      if (state.current === "session") {
        state.countDown = `${state.sessionLength < 10 ? "0" : ""}${
          state.sessionLength
        }:00`;
      } else {
        state.countDown = `${state.breakLength < 10 ? "0" : ""}${
          state.breakLength
        }:00`;
      }
    },
    updateCountdown: (state, action) => {
      // state.countDown = `${action.payload}`;
      state.countDown = action.payload;
    },
    updatePlaying: (state) => {
      state.playing = !state.playing;
    },
  },
});

export const {
  incrementBreakLength,
  decrementBreakLength,
  incrementSessionLength,
  decrementSessionLength,
  resetTimeLengths,
  updateClockTime,
  updateCountdown,
  updatePlaying,
} = timeControlSlice.actions;

// export const selectBreakTime = (state: RootState) =>
//   `${state.timeControl.breakLength < 10 ? "0" : ""}${
//     state.timeControl.breakLength
//   }:00`;

// export const selectSessionTime = (state: RootState) =>
//   `${state.timeControl.sessionLength < 10 ? "0" : ""}${
//     state.timeControl.sessionLength
//   }:00`;

export default timeControlSlice.reducer;
