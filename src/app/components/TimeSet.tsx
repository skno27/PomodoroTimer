import { useDispatch, useSelector } from "react-redux";
import Arrow from "./Arrow";
import { RootState } from "../../../store";
import {
  decrementBreakLength,
  decrementSessionLength,
  incrementBreakLength,
  incrementSessionLength,
  updateClockTime,
} from "../../../features/timeControl/timeControlSlice";

export default function TimeSet({ title }: TimeSetProps) {
  const breakCount = useSelector(
    (state: RootState) => state.timeControl.breakLength
  );

  const sessionCount = useSelector(
    (state: RootState) => state.timeControl.sessionLength
  );

  const currentClock = useSelector(
    (state: RootState) => state.timeControl.current
  );

  const playing = useSelector((state: RootState) => state.timeControl.playing);

  const dispatch = useDispatch();

  const decrementBreakTime = () => {
    if (!playing) {
      dispatch(decrementBreakLength());
      if (currentClock === "break") dispatch(updateClockTime());
    }
  };

  const decrementSessionTime = () => {
    if (!playing) {
      dispatch(decrementSessionLength());
      if (currentClock === "session") dispatch(updateClockTime());
    }
  };

  const incrementBreakTime = () => {
    if (!playing) {
      dispatch(incrementBreakLength());
      if (currentClock === "break") dispatch(updateClockTime());
    }
  };

  const incrementSessionTime = () => {
    if (!playing) {
      dispatch(incrementSessionLength());
      if (currentClock === "session") dispatch(updateClockTime());
    }
  };

  return title === "Break Length" ? (
    <div className="flex-col justify-center">
      <h2>{title}</h2>
      <div className="set">
        <Arrow
          onClick={decrementBreakTime}
          direction="down"
        />
        <div className="count-div">
          <h1>{breakCount}</h1>
        </div>
        <Arrow
          onClick={incrementBreakTime}
          direction="up"
        />
      </div>
    </div>
  ) : title === "Session Length" ? (
    <div className="flex-col justify-center">
      <h2>{title}</h2>
      <div className="set">
        <Arrow
          onClick={decrementSessionTime}
          direction="down"
        />
        <div className="count-div">
          <h1>{sessionCount}</h1>
        </div>
        <Arrow
          onClick={incrementSessionTime}
          direction="up"
        />
      </div>
    </div>
  ) : null;
}
