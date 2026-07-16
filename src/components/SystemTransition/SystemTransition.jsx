import { motion } from "framer-motion";
import "./SystemTransition.css";

const loadingSteps = [
  "LOCATING DIRECTORY",
  "VERIFYING FILE STRUCTURE",
  "DECRYPTING ARCHIVE",
  "LAUNCHING INTERFACE",
];

export default function SystemTransition({ label = "UNKNOWN_FILE" }) {
  return (
    <motion.div
      className="system-transition"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="system-transition__scanlines" />

      <motion.div
        className="system-transition__flash"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1, 1],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 0.55,
          ease: "easeInOut",
        }}
      />

      <motion.section
        className="system-transition__window"
        initial={{
          opacity: 0,
          scale: 0.9,
          y: 24,
          filter: "blur(12px)",
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          scale: 1.04,
          filter: "blur(8px)",
        }}
        transition={{
          duration: 0.3,
          ease: [0.2, 0.8, 0.2, 1],
        }}
      >
        <header className="system-transition__header">
          <div className="system-transition__identity">
            <span className="system-transition__status-light" />

            <div>
              <span>MAGI DRIVE</span>
              <strong>FILE ACCESS PROTOCOL</strong>
            </div>
          </div>

          <span className="system-transition__code">
            SYS_004
          </span>
        </header>

        <div className="system-transition__body">
          <p className="system-transition__eyebrow">
            ACCESSING DIRECTORY
          </p>

          <h1>{label}</h1>

          <div className="system-transition__loading">
            <div className="system-transition__loading-header">
              <span>DECRYPTING DATA</span>
              <span>100%</span>
            </div>

            <div className="system-transition__bar">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.62,
                  ease: [0.2, 0.7, 0.2, 1],
                }}
              />
            </div>
          </div>

          <div className="system-transition__steps">
            {loadingSteps.map((step, index) => (
              <motion.div
                key={step}
                className="system-transition__step"
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.1 + index * 0.1,
                  duration: 0.2,
                }}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{step}</p>

                <strong>OK</strong>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="system-transition__success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ACCESS GRANTED
          </motion.p>
        </div>

        <footer className="system-transition__footer">
          <span>MAGI LABS / WORK_OS</span>
          <span>SECURE CHANNEL ACTIVE</span>
        </footer>
      </motion.section>
    </motion.div>
  );
}