import { motion } from "framer-motion";
import "./DesktopIcon.css";

export default function DesktopIcon({ label, Icon, accent = "green", onOpen }) {
  return (
    <motion.button
      className={`desktop-icon desktop-icon--${accent}`}
      type="button"
      onClick={onOpen}
      data-cursor="scan"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.95 }}
    >
      <motion.span
        className="desktop-icon__object"
        variants={{
          rest: { rotateY: 0, rotateX: 0, y: 0 },
          hover: {
            rotateY: 360,
            rotateX: 14,
            y: -7,
            transition: { duration: 0.82, ease: "easeInOut" }
          }
        }}
      >
        <span className="desktop-icon__pixel">
          <Icon />
        </span>
        <span className="desktop-icon__shadow" />
      </motion.span>

      <span className="desktop-icon__label">{label}</span>
      <span className="desktop-icon__status">READY</span>
    </motion.button>
  );
}
