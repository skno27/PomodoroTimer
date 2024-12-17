"use client";
import Clock from "./components/Clock";
import TimeSet from "./components/TimeSet";
import ControlBar from "./components/ControlBar";
export default function Home() {
  return (
    <div id="container">
      <h1 className="text-center">25 + 5 Pomodoro Clock</h1>
      <div
        id="set-div"
        className="max-w-md m-auto flex flex-row justify-evenly">
        <TimeSet title="Break Length" />
        <TimeSet title="Session Length" />
      </div>
      <Clock />
      <div className="flex justify-center">
        <ControlBar />
      </div>
    </div>
  );
}
