import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../../store";
import {
  updateCountdown,
  updatePlaying,
  resetTimeLengths,
  toggleCurrent,
} from "../../../features/timeControl/timeControlSlice";
import { useAlertAudio } from "../../../hooks/useAlert";
export default function ControlBar() {
  const dispatch = useDispatch();
  const playAlert = useAlertAudio("/assets/alert.mp3");

  // redux state
  const breakCountInSeconds = useSelector(
    (state: RootState) => state.timeControl.breakLength * 60
  );
  const sessionCountInSeconds = useSelector(
    (state: RootState) => state.timeControl.sessionLength * 60
  );
  const playing = useSelector((state: RootState) => state.timeControl.playing);

  // local state
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [sessionActive, setSessionActive] = useState<boolean>(true);
  // const [paused, setPause] = useState<boolean>(false);

  // playing logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (playing) {
      interval = setInterval(() => {
        setTimeInSeconds((previous) => {
          if (previous < 1) {
            playAlert();
            dispatch(toggleCurrent()); // switch label
            const nextTime = sessionActive
              ? breakCountInSeconds
              : sessionCountInSeconds;
            setSessionActive((previousActive) => !previousActive);
            return nextTime;
          }
          return previous - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [
    playing,
    sessionActive,
    sessionCountInSeconds,
    breakCountInSeconds,
    playAlert,
    dispatch,
  ]);

  // listen for timer length changes when paused
  useEffect(() => {
    if (sessionActive) {
      setTimeInSeconds(sessionCountInSeconds);
      dispatch(updateCountdown(formatTime(sessionCountInSeconds)));
    }
  }, [sessionCountInSeconds, sessionActive, dispatch]);

  useEffect(() => {
    if (!sessionActive) {
      setTimeInSeconds(breakCountInSeconds);
      dispatch(updateCountdown(formatTime(breakCountInSeconds)));
    }
  }, [breakCountInSeconds, sessionActive, dispatch]);

  // update redux with formatted time string
  useEffect(() => {
    const formattedTime = formatTime(timeInSeconds);
    dispatch(updateCountdown(formattedTime));
  }, [timeInSeconds, dispatch]);

  const play_pause = () => {
    if (!playing) dispatch(updatePlaying());
    if (playing) dispatch(updatePlaying());
  };
  // const pause = () => {
  // };

  const reset = () => {
    if (playing) dispatch(updatePlaying());
    dispatch(resetTimeLengths());
    setTimeInSeconds(sessionCountInSeconds);
    setSessionActive(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  return (
    <div
      id="control-div"
      className="w-1/12 flex justify-evenly mt-8">
      <button
        id="start_stop"
        className="btn-control"
        onClick={play_pause}>
        <div className="flex">
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faPause} />
        </div>
      </button>
      <div className="flex">
        <button
          id="reset"
          className="btn-control">
          <FontAwesomeIcon
            icon={faRepeat}
            onClick={reset}
          />
        </button>
      </div>
    </div>
  );
}
