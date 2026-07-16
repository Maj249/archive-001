import { useEffect, useState } from "react";
import { finishLoading } from "../../system/windowManager";

import "./styles.css";

const STAGES = [
  "MOUNTING MAGI DRIVE...",
  "VERIFYING USER...",
  "SCANNING FILESYSTEM...",
  "LOADING ASSETS...",
  "DECRYPTING CONTENT...",
  "RENDERING INTERFACE..."
];

export default function Loader() {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    let value = 0;

    const timer = setInterval(() => {
      value += Math.random() * 7 + 2;

      if (value > 100) value = 100;

      setProgress(value);

      const currentStage = Math.min(
        Math.floor((value / 100) * STAGES.length),
        STAGES.length - 1
      );

      setStage(currentStage);

      if (value >= 100) {
        clearInterval(timer);

        setTimeout(() => {
          finishLoading();
        }, 350);
      }
    }, 70);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="loader">

      <div className="loader__header">

        <span>MAGI OPERATING SYSTEM</span>

        <strong>LOADER v1.0</strong>

      </div>

      <div className="loader__title">

        INITIALISING APPLICATION

      </div>

      <div className="loader__stage">

        {STAGES[stage]}

      </div>

      <div className="loader__bar">

        <div
          className="loader__fill"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="loader__footer">

        <span>{Math.floor(progress)}%</span>

        <span>READYING INTERFACE...</span>

      </div>

      <div className="loader__log">

        {STAGES.map((item, index) => (

          <div
            key={item}
            className={
              index <= stage
                ? "loader__line active"
                : "loader__line"
            }
          >

            <span>{String(index + 1).padStart(2, "0")}</span>

            <p>{item}</p>

          </div>

        ))}

      </div>

    </div>
  );
}