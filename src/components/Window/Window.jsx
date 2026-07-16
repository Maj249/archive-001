import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Loader from "../../features/Loader";
import registry from "../../system/registry";

import {
  closeApp,
  subscribe,
} from "../../system/windowManager";

import "./Window.css";

export default function Window() {
  const [activeApp, setActiveApp] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    return subscribe(setActiveApp);
  }, []);

  useEffect(() => {
    const pointerQuery = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    );

    function updatePointerMode() {
      setIsTouchDevice(pointerQuery.matches);
    }

    updatePointerMode();

    pointerQuery.addEventListener?.(
      "change",
      updatePointerMode
    );

    return () => {
      pointerQuery.removeEventListener?.(
        "change",
        updatePointerMode
      );
    };
  }, []);

  const app = activeApp
    ? registry[activeApp.id]
    : null;

  const AppComponent = app?.component;

  return (
    <AnimatePresence>
      {activeApp && app && (
        <motion.div
          className="window-layer"
          key={`${activeApp.id}-${activeApp.openedAt}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <motion.section
            className="window"
            drag={!isTouchDevice}
            dragMomentum={false}
            dragElastic={0.06}
            dragConstraints={{
              top: -280,
              right: 620,
              bottom: 280,
              left: -620,
            }}
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 24,
              filter: "blur(8px)",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={{
              opacity: 0,
              scale: 0.97,
              y: 14,
              filter: "blur(5px)",
            }}
            transition={{
              duration: 0.28,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            aria-label={`${app.title} window`}
          >
            <header
              className="window__header"
              data-cursor={
                isTouchDevice
                  ? undefined
                  : "DRAG WINDOW"
              }
            >
              <div className="window__lights">
                <span />
                <span />
                <span />
              </div>

              <div className="window__identity">
                <span>MAGI DRIVE</span>
                <strong>{app.title}</strong>
              </div>

              <div className="window__header-status">
                <span>
                  {activeApp.loading
                    ? "LOADING"
                    : "READY"}
                </span>

                <i />
              </div>

              <button
                className="window__close"
                type="button"
                onClick={closeApp}
                data-cursor="CLOSE WINDOW"
                aria-label={`Close ${app.title}`}
              >
                ×
              </button>
            </header>

            <div className="window__toolbar">
              <span>FILE</span>
              <span>VIEW</span>
              <span>ANALYSE</span>
              <span>SYSTEM</span>

              <strong>
                /MAGI/{activeApp.id.toUpperCase()}
              </strong>
            </div>

            <div className="window__body">
              {activeApp.loading ? (
                <Loader />
              ) : (
                <AppComponent
                  {...app.props}
                />
              )}
            </div>

            <footer className="window__footer">
              <span>
                STATUS:
                {activeApp.loading
                  ? " INITIALISING"
                  : " READY"}
              </span>

              <span>{app.title}</span>

              <span>MAGI_OS 0.2.0</span>
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}