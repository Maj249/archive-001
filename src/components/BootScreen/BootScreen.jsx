import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import MobileBootScreen from "./MobileBootScreen";
import "./BootScreen.css";
import "./MobileBootScreen.css";

const bootSteps = [
  "POWERING CREATIVE KERNEL",
  "MOUNTING ARCHIVE_001",
  "INDEXING DESIGN OBJECTS",
  "RESTORING SKETCH DATA",
  "CALIBRATING DISPLAY",
  "WORK_OS ONLINE",
];

function getActiveStep(progress) {
  return Math.min(
    bootSteps.length - 1,
    Math.floor((progress / 100) * bootSteps.length)
  );
}

export default function BootScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [entering, setEntering] = useState(false);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 700px), (hover: none) and (pointer: coarse)")
          .matches
      : false
  );

  const activeStep = useMemo(() => getActiveStep(progress), [progress]);

  useEffect(() => {
    const mobileQuery = window.matchMedia(
      "(max-width: 700px), (hover: none) and (pointer: coarse)"
    );

    function updateMobileMode() {
      setIsMobile(mobileQuery.matches);
    }

    updateMobileMode();
    mobileQuery.addEventListener?.("change", updateMobileMode);

    return () => {
      mobileQuery.removeEventListener?.("change", updateMobileMode);
    };
  }, []);

  useEffect(() => {
    let frameId = 0;
    let readyTimer = 0;
    let startedAt = null;
    const duration = 2400;

    function animateProgress(timestamp) {
      if (startedAt === null) startedAt = timestamp;

      const elapsed = timestamp - startedAt;
      const linearProgress = Math.min(1, elapsed / duration);
      const easedProgress = 1 - Math.pow(1 - linearProgress, 2.25);

      setProgress(Math.min(100, easedProgress * 100));

      if (linearProgress < 1) {
        frameId = window.requestAnimationFrame(animateProgress);
        return;
      }

      setProgress(100);
      readyTimer = window.setTimeout(() => setReady(true), 320);
    }

    frameId = window.requestAnimationFrame(animateProgress);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(readyTimer);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter" && ready && !entering) {
        handleEnter();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [ready, entering, onComplete]);

  function handleEnter() {
    if (!ready || entering) {
      return;
    }

    setEntering(true);
    window.setTimeout(onComplete, 520);
  }

  if (isMobile) {
    return (
      <MobileBootScreen
        progress={progress}
        ready={ready}
        entering={entering}
        activeStep={activeStep}
        steps={bootSteps}
        onEnter={handleEnter}
      />
    );
  }

  return (
    <motion.main
      className={`boot-screen${ready ? " boot-screen--ready" : ""}${
        entering ? " boot-screen--entering" : ""
      }`}
      onClick={ready ? handleEnter : undefined}
      data-cursor={ready ? "ENTER WORK_OS" : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: entering ? 0 : 1 }}
      transition={{ duration: entering ? 0.5 : 0.7 }}
    >
      <div className="boot-screen__shell">
        <header className="boot-screen__topbar">
          <div>
            <span>MAGI LABS</span>
            <strong>WORK_OS</strong>
          </div>

          <div className="boot-screen__top-meta">
            <span>SYS: 002</span>
            <span>MEM: 064K</span>
            <span>CRT: ACTIVE</span>
          </div>
        </header>

        <div className="boot-screen__layout">
          <section className="boot-screen__identity">
            <div className="boot-screen__title">
              <p>CREATIVE OPERATING SYSTEM</p>
              <h1>MAGI</h1>
              <h2>WORK_OS</h2>
            </div>

            <div className="boot-screen__mark-panel">
              <div className="boot-screen__mark-stage" aria-hidden="true">
                <span className="boot-screen__orbit boot-screen__orbit--outer" />
                <span className="boot-screen__orbit boot-screen__orbit--middle" />
                <span className="boot-screen__orbit boot-screen__orbit--inner" />
                <span className="boot-screen__axis boot-screen__axis--x" />
                <span className="boot-screen__axis boot-screen__axis--y" />

                <span className="boot-screen__glyph-stack">
                  {[4, 3, 2, 1].map((layer) => (
                    <MagiBootGlyph key={layer} layer={layer} ghost />
                  ))}
                </span>

                <MagiBootGlyph layer={0} />
                <span className="boot-screen__mark-scan" />
              </div>

              <div className="boot-screen__mark-data">
                <span>OBJECT: M.EXE</span>
                <span>ROTATION: ACTIVE</span>
                <span>CORE: {ready ? "ONLINE" : "SYNCING"}</span>
              </div>

              <div className="boot-screen__mark-target" aria-hidden="true">
                <i />
                <i />
              </div>
            </div>
          </section>

          <section className="boot-screen__system">
            <div className="boot-screen__cards">
              <SystemCard label="BUILD" value="002" />
              <SystemCard label="CHANNEL" value="ARCHIVE" />
              <SystemCard label="STATUS" value={ready ? "READY" : "BOOT"} />
            </div>

            <div className="boot-screen__pulse" aria-hidden="true">
              <svg viewBox="0 0 720 120" preserveAspectRatio="none">
                <path d="M0 66H48L66 58L81 94L98 13L116 102L132 66H190L208 58L223 94L240 13L258 102L274 66H332L350 58L365 94L382 13L400 102L416 66H474L492 58L507 94L524 13L542 102L558 66H616L634 58L650 91L668 66H720" />
              </svg>
            </div>

            <div className="boot-screen__progress-block">
              <div className="boot-screen__progress-label">
                <span>{ready ? "SYSTEM READY" : "INITIALISING SYSTEM"}</span>
                <strong>{Math.floor(progress)}%</strong>
              </div>

              <div className="boot-screen__progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="boot-screen__log">
              {bootSteps.map((step, index) => {
                const complete = progress >= ((index + 1) / bootSteps.length) * 100;
                const active = index === activeStep && !ready;

                return (
                  <div
                    className={`boot-screen__log-row${
                      complete ? " boot-screen__log-row--complete" : ""
                    }${active ? " boot-screen__log-row--active" : ""}`}
                    key={step}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                    <strong>{complete ? "OK" : active ? "..." : "--"}</strong>
                  </div>
                );
              })}
            </div>

            <div className="boot-screen__enter-zone">
              <button
                className="boot-screen__enter"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleEnter();
                }}
                disabled={!ready || entering}
                data-cursor="ENTER WORK_OS"
              >
                <span>{ready ? "SYSTEM ACCESS GRANTED" : "PLEASE STAND BY"}</span>
                <strong>ENTER WORK_OS</strong>
                <i>↗</i>
              </button>

              <small>{ready ? "CLICK OR PRESS ENTER" : "AWAITING KERNEL"}</small>
            </div>
          </section>
        </div>

        <footer className="boot-screen__footer">
          <span>PROJECT: ARCHIVE_001</span>
          <strong>{ready ? "PRESS ENTER TO CONTINUE" : "PLEASE STAND BY"}</strong>
          <span>MELBOURNE / AU</span>
        </footer>
      </div>

      {ready && (
        <motion.div
          className="boot-screen__ready-prompt"
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          aria-hidden="true"
        >
          <span>SYSTEM READY</span>
          <strong>CLICK ANYWHERE TO ENTER</strong>
          <small>OR PRESS ENTER</small>
        </motion.div>
      )}

      <div className="boot-screen__scanlines" aria-hidden="true" />
      <div className="boot-screen__noise" aria-hidden="true" />
    </motion.main>
  );
}

function SystemCard({ label, value }) {
  return (
    <div className="boot-screen__card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function MagiBootGlyph({ layer, ghost = false }) {
  return (
    <svg
      className={`boot-screen__glyph${ghost ? " boot-screen__glyph--ghost" : ""}`}
      style={{ "--boot-layer": layer }}
      viewBox="0 0 500 500"
    >
      <path d="M64 401V99h84l102 145L352 99h84v302h-92V250l-94 129-94-129v151H64Z" />
      <path
        className="boot-screen__glyph-cut"
        d="M112 144h24l114 162 114-162h24M110 362h46M344 362h46"
      />
    </svg>
  );
}
