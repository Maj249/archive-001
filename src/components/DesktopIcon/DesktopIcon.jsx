import { motion } from "framer-motion";

import { openApp } from "../../system/windowManager";
import PixelIcon from "../PixelIcon/PixelIcon";

import "./DesktopIcon.css";

export default function DesktopIcon({
  id,
  label,
  accent = "green",
  index = 0,
  fileType = "FILE",
}) {
  function handleOpen() {
    openApp(id);
  }

  return (
    <motion.button
      className={`desktop-icon desktop-icon--${accent}`}
      type="button"
      onClick={handleOpen}
      data-cursor="OPEN FILE"
      aria-label={`Open ${label}`}
      style={{ "--icon-index": index }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.045 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="desktop-icon__stage" aria-hidden="true">
        <span className="desktop-icon__orbit desktop-icon__orbit--one" />
        <span className="desktop-icon__orbit desktop-icon__orbit--two" />
        <span className="desktop-icon__scan" />

        <span className="desktop-icon__icon">
          {id === "music" ? (
            <SpotifyGlyph />
          ) : (
            <PixelIcon type={id} accent={accent} />
          )}
        </span>

        <span className="desktop-icon__node desktop-icon__node--one" />
        <span className="desktop-icon__node desktop-icon__node--two" />
      </span>

      <span className="desktop-icon__copy">
        <strong>{label}</strong>
        <small>
          {String(index + 1).padStart(2, "0")} / {fileType}
        </small>
      </span>
    </motion.button>
  );
}

function SpotifyGlyph() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="27" fill="currentColor" />
      <path
        d="M18 26c10-3 23-2 31 2M20 34c8-2 19-1 26 2M23 42c6-1.5 14-.7 20 2"
        fill="none"
        stroke="#061006"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
