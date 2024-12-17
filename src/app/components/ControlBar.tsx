import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../../store";
import {
  updateCountdown,
  updatePlaying,
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
      if (timeInSeconds === 0) {
        setTimeInSeconds(
          sessionActive ? sessionCountInSeconds : breakCountInSeconds
        );
      }
      interval = setInterval(() => {
        setTimeInSeconds((previous) => {
          if (previous < 1) {
            playAlert();
            setSessionActive((previousActive) => !previousActive);
            return !sessionActive ? sessionCountInSeconds : breakCountInSeconds;
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
    timeInSeconds,
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

  const play = () => {
    if (!playing) dispatch(updatePlaying());
  };
  const pause = () => {
    if (playing) dispatch(updatePlaying());
  };

  const reset = () => {
    pause();
    setTimeInSeconds(sessionCountInSeconds);
    setSessionActive(true);
    dispatch(updateCountdown(formatTime(sessionCountInSeconds)));
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
      className="flex justify-center mt-8">
      <button
        className="btn-control"
        onClick={play}>
        <FontAwesomeIcon icon={faPlay} />
      </button>
      <button
        className="btn-control mx-2"
        onClick={pause}>
        <FontAwesomeIcon icon={faPause} />
      </button>
      <button className="btn-control">
        <FontAwesomeIcon
          icon={faRepeat}
          onClick={reset}
        />
      </button>
    </div>
  );
}
