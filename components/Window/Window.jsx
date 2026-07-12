import { motion } from "framer-motion";
import { FaMinus, FaXmark } from "react-icons/fa6";
import "./Window.css";

export default function Window({ title, children, onClose, onMinimise, width = 780 }) {
  return (
    <motion.section
      className="window"
      style={{ width: `min(${width}px, calc(100vw - 28px))` }}
      drag
      dragMomentum={false}
      dragConstraints={{ top: -80, right: 500, bottom: 420, left: -500 }}
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 16 }}
      transition={{ duration: 0.22 }}
    >
      <header className="window__bar">
        <div className="window__identity">
          <span className="window__status" />
          <span>{title}</span>
        </div>

        <div className="window__controls">
          <button type="button" onClick={onMinimise} aria-label="Minimise" data-cursor="minimise">
            <FaMinus />
          </button>
          <button type="button" onClick={onClose} aria-label="Close" data-cursor="close">
            <FaXmark />
          </button>
        </div>
      </header>

      <div className="window__toolbar">
        <span>FILE</span>
        <span>VIEW</span>
        <span>ARRANGE</span>
        <span>HELP</span>
      </div>

      <div className="window__content">{children}</div>

      <footer className="window__footer">
        MAGI DRIVE / {title}
      </footer>
    </motion.section>
  );
}
