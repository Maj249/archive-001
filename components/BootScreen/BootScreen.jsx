import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./BootScreen.css";

const lines = [
  "INITIALIZING CREATIVE KERNEL...",
  "MOUNTING ARCHIVE_001...",
  "INDEXING OBJECTS...",
  "RESTORING SKETCH MATERIAL...",
  "CALIBRATING VISUAL SYSTEM...",
  "SYSTEM ONLINE."
];

export default function BootScreen({ onComplete }) {
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const timers = lines.map((line, index) =>
      setTimeout(() => setVisible((current) => [...current, line]), 420 * (index + 1))
    );

    const done = setTimeout(onComplete, 420 * lines.length + 1200);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(done);
    };
  }, [onComplete]);

  return (
    <motion.main
      className="boot-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "brightness(2)" }}
      transition={{ duration: 0.45 }}
    >
      <div className="boot-screen__noise" />
      <div className="boot-screen__scanlines" />

      <section className="boot-screen__panel">
        <p className="boot-screen__label">MAGI LABS / SYSTEM RELEASE</p>
        <h1>WORK_OS</h1>
        <p className="boot-screen__version">VERSION 2.0 / BUILD 002</p>

        <div className="boot-screen__rule" />

        <div className="boot-screen__log">
          {visible.map((line) => (
            <p key={line}>
              <span>&gt;</span> {line}
            </p>
          ))}
          <span className="boot-screen__cursor">█</span>
        </div>
      </section>

      <p className="boot-screen__footer">PROJECT: ARCHIVE_001 / MELBOURNE</p>
    </motion.main>
  );
}
