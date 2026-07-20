import { useEffect, useMemo, useState } from "react";
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

export default function Loader({ instanceId }) {
  const [progress, setProgress] = useState(0);
  const stage = useMemo(
    () =>
      Math.min(
        STAGES.length - 1,
        Math.floor((progress / 100) * STAGES.length)
      ),
    [progress]
  );

  useEffect(() => {
    let frameId = 0;
    let finishTimer = 0;
    let startedAt = null;
    const duration = 1550;

    function animateProgress(timestamp) {
      if (startedAt === null) startedAt = timestamp;

      const elapsed = timestamp - startedAt;
      const linearProgress = Math.min(1, elapsed / duration);
      const easedProgress = 1 - Math.pow(1 - linearProgress, 2.4);

      setProgress(Math.min(100, easedProgress * 100));

      if (linearProgress < 1) {
        frameId = window.requestAnimationFrame(animateProgress);
        return;
      }

      setProgress(100);
      finishTimer = window.setTimeout(() => finishLoading(instanceId), 260);
    }

    frameId = window.requestAnimationFrame(animateProgress);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(finishTimer);
    };
  }, [instanceId]);

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
