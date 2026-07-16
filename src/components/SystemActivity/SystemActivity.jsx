import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaVolumeHigh,
  FaVolumeXmark,
} from "react-icons/fa6";

import "./SystemActivity.css";

const systemEvents = [
  {
    channel: "ARCHIVE",
    title: "DIRECTORY INDEX UPDATED",
    detail: "08 CREATIVE FILES VERIFIED",
    tone: "amber",
  },
  {
    channel: "OBJECT",
    title: "FORM ANALYSIS COMPLETE",
    detail: "SURFACE DATA STABLE",
    tone: "blue",
  },
  {
    channel: "SKETCH",
    title: "NEW MATERIAL DETECTED",
    detail: "DRAWING LAYER RECOVERED",
    tone: "green",
  },
  {
    channel: "SYSTEM",
    title: "CREATIVE KERNEL ONLINE",
    detail: "ALL CHANNELS RESPONSIVE",
    tone: "amber",
  },
  {
    channel: "RENDER",
    title: "VISUAL ENGINE STANDBY",
    detail: "DISPLAY PIPELINE AVAILABLE",
    tone: "violet",
  },
  {
    channel: "MEMORY",
    title: "UNFINISHED IDEA FOUND",
    detail: "SAVED TO ARCHIVE BUFFER",
    tone: "red",
  },
  {
    channel: "NETWORK",
    title: "MAGI LINK ESTABLISHED",
    detail: "LATENCY 004MS",
    tone: "blue",
  },
];

const packetData = [
  { top: "13%", duration: 9, delay: -2, width: 110 },
  { top: "23%", duration: 13, delay: -8, width: 74 },
  { top: "37%", duration: 10, delay: -4, width: 148 },
  { top: "49%", duration: 15, delay: -11, width: 92 },
  { top: "61%", duration: 11, delay: -6, width: 126 },
  { top: "74%", duration: 14, delay: -3, width: 84 },
  { top: "86%", duration: 12, delay: -9, width: 136 },
];

export default function SystemActivity() {
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  });

  const [event, setEvent] = useState(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [cycle, setCycle] = useState(0);

  const eventTimer = useRef(null);
  const hideTimer = useRef(null);
  const pulseTimer = useRef(null);
  const audioContext = useRef(null);

  useEffect(() => {
    function updateCoordinates(pointerEvent) {
      setCoordinates({
        x: Math.round(pointerEvent.clientX),
        y: Math.round(pointerEvent.clientY),
      });
    }

    window.addEventListener("pointermove", updateCoordinates, {
      passive: true,
    });

    return () => {
      window.removeEventListener(
        "pointermove",
        updateCoordinates
      );
    };
  }, []);

  useEffect(() => {
    function scheduleEvent() {
      const delay = 8000 + Math.random() * 9000;

      eventTimer.current = window.setTimeout(() => {
        const nextEvent =
          systemEvents[
            Math.floor(Math.random() * systemEvents.length)
          ];

        setEvent({
          ...nextEvent,
          id: Date.now(),
        });

        setCycle((current) => current + 1);

        if (soundEnabled) {
          playSystemTone(nextEvent.tone);
        }

        hideTimer.current = window.setTimeout(() => {
          setEvent(null);
          scheduleEvent();
        }, 4200);
      }, delay);
    }

    const firstTimer = window.setTimeout(() => {
      setEvent({
        channel: "SYSTEM",
        title: "WORK_OS FULLY ONLINE",
        detail: "WELCOME TO MAGI DRIVE",
        tone: "amber",
        id: Date.now(),
      });

      hideTimer.current = window.setTimeout(() => {
        setEvent(null);
        scheduleEvent();
      }, 4000);
    }, 1800);

    return () => {
      window.clearTimeout(firstTimer);
      window.clearTimeout(eventTimer.current);
      window.clearTimeout(hideTimer.current);
    };
  }, [soundEnabled]);

  useEffect(() => {
    function schedulePulse() {
      const delay = 11000 + Math.random() * 15000;

      pulseTimer.current = window.setTimeout(() => {
        setPulse(true);

        window.setTimeout(() => {
          setPulse(false);
          schedulePulse();
        }, 700);
      }, delay);
    }

    schedulePulse();

    return () => {
      window.clearTimeout(pulseTimer.current);
    };
  }, []);

  function getAudioContext() {
    if (!audioContext.current) {
      const AudioContextClass =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!AudioContextClass) {
        return null;
      }

      audioContext.current = new AudioContextClass();
    }

    return audioContext.current;
  }

  function playSystemTone(tone = "amber") {
    const context = getAudioContext();

    if (!context) {
      return;
    }

    const frequencies = {
      amber: [420, 620],
      blue: [520, 820],
      green: [460, 700],
      violet: [350, 760],
      red: [220, 310],
    };

    const selected =
      frequencies[tone] ?? frequencies.amber;

    const oscillator = context.createOscillator();
    const gain = context.createGain();

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(
      selected[0],
      context.currentTime
    );

    oscillator.frequency.exponentialRampToValueAtTime(
      selected[1],
      context.currentTime + 0.08
    );

    gain.gain.setValueAtTime(
      0.0001,
      context.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.035,
      context.currentTime + 0.012
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      context.currentTime + 0.13
    );

    oscillator.connect(gain);
    gain.connect(context.destination);

    oscillator.start();
    oscillator.stop(context.currentTime + 0.14);
  }

  async function toggleSound() {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);

    if (nextState) {
      const context = getAudioContext();

      if (context?.state === "suspended") {
        await context.resume();
      }

      playSystemTone("amber");
    }
  }

  return (
    <div
      className={`system-activity ${
        pulse ? "system-activity--pulse" : ""
      }`}
    >
      <div className="system-activity__packet-field">
        {packetData.map((packet, index) => (
          <span
            key={index}
            className={`system-packet system-packet--${
              index % 3
            }`}
            style={{
              top: packet.top,
              width: `${packet.width}px`,
              animationDuration: `${packet.duration}s`,
              animationDelay: `${packet.delay}s`,
            }}
          >
            <i />
            <b>
              {String(index + cycle)
                .padStart(4, "0")
                .slice(-4)}
            </b>
          </span>
        ))}
      </div>

      <div className="system-activity__telemetry">
        <header>
          <span>LIVE TELEMETRY</span>

          <strong>CH_06</strong>
        </header>

        <div className="system-activity__telemetry-grid">
          <div>
            <span>POINTER X</span>
            <strong>
              {String(coordinates.x).padStart(4, "0")}
            </strong>
          </div>

          <div>
            <span>POINTER Y</span>
            <strong>
              {String(coordinates.y).padStart(4, "0")}
            </strong>
          </div>

          <div>
            <span>EVENTS</span>
            <strong>
              {String(cycle).padStart(3, "0")}
            </strong>
          </div>

          <div>
            <span>STATUS</span>
            <strong className="system-activity__online">
              LIVE
            </strong>
          </div>
        </div>

        <div className="system-activity__waveform">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="system-activity__channel-monitor">
        <span>
          <i className="channel-light channel-light--amber" />
          ARCHIVE
        </span>

        <span>
          <i className="channel-light channel-light--blue" />
          OBJECT
        </span>

        <span>
          <i className="channel-light channel-light--green" />
          NETWORK
        </span>
      </div>

      <button
        className="system-activity__sound"
        type="button"
        onClick={toggleSound}
        aria-label={
          soundEnabled
            ? "Disable interface sounds"
            : "Enable interface sounds"
        }
        title={
          soundEnabled
            ? "Disable system audio"
            : "Enable system audio"
        }
      >
        {soundEnabled ? (
          <FaVolumeHigh />
        ) : (
          <FaVolumeXmark />
        )}

        <span>
          AUDIO {soundEnabled ? "ON" : "OFF"}
        </span>
      </button>

      <AnimatePresence>
        {event && (
          <motion.aside
            key={event.id}
            className={`system-event system-event--${event.tone}`}
            initial={{
              opacity: 0,
              x: 34,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              x: 20,
              filter: "blur(5px)",
            }}
            transition={{
              duration: 0.3,
              ease: [0.2, 0.8, 0.2, 1],
            }}
          >
            <header className="system-event__header">
              <span className="system-event__light" />

              <span>MAGI SYSTEM EVENT</span>

              <strong>
                {String(event.id).slice(-4)}
              </strong>
            </header>

            <div className="system-event__body">
              <p>{event.channel}</p>
              <h2>{event.title}</h2>
              <span>{event.detail}</span>
            </div>

            <div className="system-event__progress">
              <motion.i
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

      <div className="system-activity__pulse" />
    </div>
  );
}