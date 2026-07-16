import { useEffect, useMemo, useState } from "react";
import { FaVolumeHigh, FaWifi } from "react-icons/fa6";

import {
  getActiveApp,
  openApp,
  subscribe,
} from "../../system/windowManager";

import "./Taskbar.css";

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Taskbar() {
  const [time, setTime] = useState(new Date());
  const [activeApp, setActiveApp] = useState(getActiveApp());
  const [stats, setStats] = useState({
    cpu: 28,
    gpu: 44,
    ram: 57,
  });

  useEffect(() => {
    const clock = window.setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => window.clearInterval(clock);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setStats({
        cpu: random(18, 73),
        gpu: random(34, 94),
        ram: random(42, 88),
      });
    }, 1700);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => subscribe(setActiveApp), []);

  const appName = useMemo(
    () => (activeApp ? activeApp.id.toUpperCase() : "DESKTOP"),
    [activeApp]
  );

  const terminalIsActive = activeApp?.id === "terminal";

  return (
    <footer className="taskbar">
      <button
        className={`taskbar__start${
          terminalIsActive ? " taskbar__start--active" : ""
        }`}
        type="button"
        data-cursor="OPEN TERMINAL"
        onClick={() => openApp("terminal")}
        aria-label="Open MAGI OS terminal"
        aria-pressed={terminalIsActive}
      >
        <span className="magi-core" aria-hidden="true">
          <span className="magi-core__orbit magi-core__orbit--outer" />
          <span className="magi-core__orbit magi-core__orbit--inner" />
          <span className="magi-core__scan" />
          <span className="magi-core__letter" data-letter="M">
            M
          </span>
          <span className="magi-core__spark magi-core__spark--one" />
          <span className="magi-core__spark magi-core__spark--two" />
          <span className="magi-core__spark magi-core__spark--three" />
        </span>

        <span className="taskbar__start-copy">
          <strong>MAGI OS</strong>
          <small>{terminalIsActive ? "TERMINAL ACTIVE" : "ENTER SYSTEM"}</small>
        </span>
      </button>

      <div className="taskbar__center">
        <div className="taskbar__status">
          <span className="status-led" />
          ACTIVE
        </div>

        <div className="taskbar__app">{appName}</div>
      </div>

      <div className="taskbar__metrics">
        <div className="metric">
          <small>CPU</small>
          <strong>{stats.cpu}%</strong>
        </div>

        <div className="metric">
          <small>GPU</small>
          <strong>{stats.gpu}%</strong>
        </div>

        <div className="metric">
          <small>RAM</small>
          <strong>{stats.ram}%</strong>
        </div>
      </div>

      <div className="taskbar__system">
        <FaWifi />
        <FaVolumeHigh />
        <time>
          {time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </time>
      </div>
    </footer>
  );
}

