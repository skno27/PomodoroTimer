import { useSelector } from "react-redux";
import { RootState } from "../../../store";

export default function Clock() {
  const countDown = useSelector(
    (state: RootState) => state.timeControl.countDown
  );
  return (
    <div
      id="clock-div"
      className="border-8 border-purple-950 rounded-md">
      <h1 className="text-center">Session</h1>
      <h1 className="font-extrabold text-4xl digits">{countDown}</h1>
    </div>
  );
}
