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
      if (state.breakLength < 61) {
        state.breakLength += 1;
      }
    },
    decrementBreakLength: (state) => {
      if (state.breakLength > 1) {
        state.breakLength -= 1;
      }
    },
    incrementSessionLength: (state) => {
      if (state.sessionLength < 61) {
        state.sessionLength += 1;
      }
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
    toggleCurrent: (state) => {
      state.current = state.current === "session" ? "break" : "session";
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
  toggleCurrent,
} = timeControlSlice.actions;

export default timeControlSlice.reducer;
