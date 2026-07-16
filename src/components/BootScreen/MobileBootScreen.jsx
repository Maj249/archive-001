import { motion } from "framer-motion";

export default function MobileBootScreen({
  progress,
  ready,
  entering,
  activeStep,
  steps,
  onEnter,
}) {
  const currentStep = ready ? "WORK_OS ONLINE" : steps[activeStep];

  return (
    <motion.main
      className={`mobile-boot${ready ? " mobile-boot--ready" : ""}`}
      onClick={ready ? onEnter : undefined}
      initial={{ opacity: 0 }}
      animate={{ opacity: entering ? 0 : 1 }}
      transition={{ duration: entering ? 0.45 : 0.65 }}
    >
      <header className="mobile-boot__header">
        <div>
          <span>MAGI LABS</span>
          <strong>WORK_OS</strong>
        </div>

        <span>{ready ? "SYSTEM READY" : `BOOT ${Math.floor(progress)}%`}</span>
      </header>

      <section className="mobile-boot__content">
        <div className="mobile-boot__brand">
          <p>CREATIVE OPERATING SYSTEM</p>
          <h1>MAGI</h1>
          <h2>WORK_OS</h2>
        </div>

        <div className="mobile-boot__visual" aria-hidden="true">
          <span className="mobile-boot__orbit mobile-boot__orbit--one" />
          <span className="mobile-boot__orbit mobile-boot__orbit--two" />
          <span className="mobile-boot__axis mobile-boot__axis--x" />
          <span className="mobile-boot__axis mobile-boot__axis--y" />

          <svg className="mobile-boot__glyph" viewBox="0 0 500 500">
            <path d="M64 401V99h84l102 145L352 99h84v302h-92V250l-94 129-94-129v151H64Z" />
            <path
              className="mobile-boot__glyph-cut"
              d="M112 144h24l114 162 114-162h24M110 362h46M344 362h46"
            />
          </svg>

          <span className="mobile-boot__scan" />
        </div>

        <div className="mobile-boot__status">
          <div className="mobile-boot__status-line">
            <span>{String(activeStep + 1).padStart(2, "0")}</span>
            <strong>{currentStep}</strong>
            <i>{ready ? "OK" : "..."}</i>
          </div>

          <div className="mobile-boot__progress">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <button
          className="mobile-boot__enter"
          type="button"
          disabled={!ready || entering}
          onClick={(event) => {
            event.stopPropagation();
            onEnter();
          }}
        >
          <span>{ready ? "SYSTEM ACCESS GRANTED" : "INITIALISING SYSTEM"}</span>
          <strong>{ready ? "TAP ANYWHERE TO ENTER" : `${Math.floor(progress)}%`}</strong>
          <i>{ready ? "↗" : "//"}</i>
        </button>
      </section>

      <footer className="mobile-boot__footer">
        <span>ARCHIVE_001</span>
        <span>MELBOURNE / AU</span>
      </footer>

      <div className="mobile-boot__scanlines" aria-hidden="true" />
    </motion.main>
  );
}
