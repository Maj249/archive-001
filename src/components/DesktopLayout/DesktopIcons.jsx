import { motion } from "framer-motion";

import desktopItems from "../../system/desktopItems";
import DesktopIcon from "../DesktopIcon/DesktopIcon";

export default function DesktopIcons() {
  return (
    <section
      className="desktop__icon-grid"
      aria-label="Desktop applications"
    >
      {desktopItems.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <DesktopIcon
            {...item}
            index={index}
          />
        </motion.div>
      ))}
    </section>
  );
}
