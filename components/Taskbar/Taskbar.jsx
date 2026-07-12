import { useEffect, useState } from "react";
import { FaVolumeHigh, FaWifi } from "react-icons/fa6";
import "./Taskbar.css";

export default function Taskbar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="taskbar">
      <button className="taskbar__start" type="button" data-cursor="enter">
        <span>M</span>
        START
      </button>

      <div className="taskbar__active">PROJECT: ARCHIVE_001</div>

      <div className="taskbar__system">
        <FaWifi />
        <FaVolumeHigh />
        <time>
          {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </time>
      </div>
    </footer>
  );
}
