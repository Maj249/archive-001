import { useRef, useState } from "react";

import "./BinaryMark.css";

const leftReadout = [
  "CORE TYPE / MONOLITH",
  "POLYGONS / 04",
  "SIGNAL / 99.84",
  "ORIGIN / MELB",
  "STATE / PERSISTENT",
];

const rightReadout = [
  "101101 001101",
  "MESH LOCKED",
  "DEPTH / 08",
  "PHOSPHOR / G",
  "BUILD / 009",
];

export default function BinaryMark() {
  const sectionRef = useRef(null);
  const [overclocked, setOverclocked] = useState(false);

  function handlePointerMove(event) {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    const bounds = section.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    section.style.setProperty("--binary-x", x.toFixed(3));
    section.style.setProperty("--binary-y", y.toFixed(3));
    section.style.setProperty("--binary-light-x", `${(x + 0.5) * 100}%`);
    section.style.setProperty("--binary-light-y", `${(y + 0.5) * 100}%`);
  }

  function resetPointer() {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    section.style.setProperty("--binary-x", 0);
    section.style.setProperty("--binary-y", 0);
    section.style.setProperty("--binary-light-x", "50%");
    section.style.setProperty("--binary-light-y", "50%");
  }

  return (
    <section
      className={`binary-mark${overclocked ? " binary-mark--overclocked" : ""}`}
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="binary-mark__tunnel" aria-hidden="true">
        <div />
        <div />
        <div />
      </div>

      <header className="binary-mark__header">
        <div>
          <span>MAGI INDUSTRIES®</span>
          <strong>IDENTITY CORE / M.EXE</strong>
        </div>

        <div className="binary-mark__status">
          <i />
          {overclocked ? "OVERCLOCK ACTIVE" : "SYSTEM STABLE"}
        </div>
      </header>

      <div className="binary-mark__layout">
        <DataRail title="OBJECT DATA" lines={leftReadout} />

        <div className="binary-mark__viewport">
          <div className="binary-mark__coordinates" aria-hidden="true">
            <span>X / 0145</span>
            <span>Y / 0821</span>
            <span>Z / 0094</span>
          </div>

          <button
            className="binary-mark__core"
            type="button"
            onClick={() => setOverclocked((current) => !current)}
            data-cursor={overclocked ? "STABILISE M" : "OVERCLOCK M"}
            aria-pressed={overclocked}
            aria-label="Toggle MAGI identity core overclock"
          >
            <span className="binary-mark__halo binary-mark__halo--outer" />
            <span className="binary-mark__halo binary-mark__halo--middle" />
            <span className="binary-mark__halo binary-mark__halo--inner" />

            <span className="binary-mark__axis binary-mark__axis--horizontal" />
            <span className="binary-mark__axis binary-mark__axis--vertical" />

            <span className="binary-mark__layers" aria-hidden="true">
              {[5, 4, 3, 2, 1].map((layer) => (
                <MagiGlyph key={layer} layer={layer} ghost />
              ))}
            </span>

            <MagiGlyph layer={0} />

            <span className="binary-mark__scanner" />
            <span className="binary-mark__core-label">
              <small>CORE</small>
              <strong>M</strong>
              <small>009</small>
            </span>
          </button>

          <div className="binary-mark__instruction">
            <span>MOVE / ROTATE</span>
            <strong>CLICK TO {overclocked ? "STABILISE" : "OVERCLOCK"}</strong>
          </div>
        </div>

        <DataRail title="LIVE SIGNAL" lines={rightReadout} align="right" />
      </div>

      <footer className="binary-mark__footer">
        <span>ARTIFACT: MAGI_MONOGRAM_001</span>
        <div>
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <span>CREATIVE OPERATING SYSTEM / MELBOURNE</span>
      </footer>

      <div className="binary-mark__scanlines" aria-hidden="true" />
      <div className="binary-mark__grain" aria-hidden="true" />
    </section>
  );
}

function MagiGlyph({ layer, ghost = false }) {
  return (
    <svg
      className={`binary-mark__glyph${ghost ? " binary-mark__glyph--ghost" : ""}`}
      style={{ "--glyph-layer": layer }}
      viewBox="0 0 500 500"
      aria-hidden={ghost ? "true" : undefined}
      role={ghost ? undefined : "img"}
    >
      {!ghost && <title>MAGI M monogram</title>}
      <path d="M64 401V99h84l102 145L352 99h84v302h-92V250l-94 129-94-129v151H64Z" />
      <path
        className="binary-mark__glyph-cut"
        d="M112 144h24l114 162 114-162h24M110 362h46M344 362h46"
      />
    </svg>
  );
}

function DataRail({ title, lines, align = "left" }) {
  return (
    <aside className={`binary-mark__rail binary-mark__rail--${align}`}>
      <header>
        <span>{title}</span>
        <i />
      </header>

      <div>
        {lines.map((line, index) => (
          <p key={line}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {line}
          </p>
        ))}
      </div>

      <footer>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </footer>
    </aside>
  );
}

