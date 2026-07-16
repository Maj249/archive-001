import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./AmbientStatus.css";

const systemMessages = [
  {
    title: "ARCHIVE INDEX UPDATED",
    detail: "06 PROJECT FILES VERIFIED",
  },
  {
    title: "SCANNING OBJECT DATABASE",
    detail: "FORM DATA DETECTED",
  },
  {
    title: "SKETCH MATERIAL FOUND",
    detail: "DIRECTORY READY",
  },
  {
    title: "SYSTEM STABLE",
    detail: "ALL CREATIVE DRIVES ONLINE",
  },
  {
    title: "RENDER ENGINE STANDBY",
    detail: "GPU CHANNEL AVAILABLE",
  },
  {
    title: "EXPERIMENT LOG UPDATED",
    detail: "NEW MATERIAL ENTRY",
  },
  {
    title: "MAGI DRIVE ACTIVE",
    detail: "READ / WRITE ENABLED",
  },
  {
    title: "BACKGROUND PROCESS",
    detail: "INDEXING UNFINISHED IDEAS",
  },
];

export default function AmbientStatus() {
  const [message, setMessage] = useState(null);
  const timeoutRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  useEffect(() => {
    function scheduleMessage() {
      const delay = 9000 + Math.random() * 11000;

      timeoutRef.current = window.setTimeout(() => {
        const nextMessage =
          systemMessages[
            Math.floor(Math.random() * systemMessages.length)
          ];

        setMessage({
          ...nextMessage,
          id: Date.now(),
        });

        hideTimeoutRef.current = window.setTimeout(() => {
          setMessage(null);
          scheduleMessage();
        }, 4200);
      }, delay);
    }

    const firstMessage = window.setTimeout(() => {
      setMessage({
        title: "WORK_OS ONLINE",
        detail: "CREATIVE ARCHIVE READY",
        id: Date.now(),
      });

      hideTimeoutRef.current = window.setTimeout(() => {
        setMessage(null);
        scheduleMessage();
      }, 3800);
    }, 1800);

    return () => {
      window.clearTimeout(firstMessage);
      window.clearTimeout(timeoutRef.current);
      window.clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  return (
    <div className="ambient-status-container">
      <AnimatePresence>
        {message && (
          <motion.aside
            key={message.id}
            className="ambient-status"
            initial={{
              opacity: 0,
              x: 30,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              x: 18,
              filter: "blur(5px)",
            }}
            transition={{
              duration: 0.32,
              ease: "easeOut",
            }}
          >
            <div className="ambient-status__header">
              <span className="ambient-status__signal" />

              <span>MAGI SYSTEM EVENT</span>

              <span className="ambient-status__code">
                0X{String(message.id).slice(-4)}
              </span>
            </div>

            <div className="ambient-status__body">
              <strong>{message.title}</strong>
              <p>{message.detail}</p>
            </div>

            <div className="ambient-status__progress">
              <motion.span
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{
                  duration: 4,
                  ease: "linear",
                }}
              />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}