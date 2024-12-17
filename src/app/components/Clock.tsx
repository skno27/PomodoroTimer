import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function Clock() {
  const countDown = useSelector(
    (state: RootState) => state.timeControl.countDown
  );
  const active = useSelector((state: RootState) => state.timeControl.current);

  console.log(active);

  return (
    <div
      id="clock-div"
      className="border-8 border-purple-950 rounded-md">
      <h1
        id="timer-label"
        className="text-center">
        {active === "session" ? "Session" : "Break"}
      </h1>
      <h1
        id="time-left"
        className="font-extrabold text-4xl digits">
        {countDown}
      </h1>
    </div>
  );
}
