import { motion } from "framer-motion";

import AnimatedBackground from "../AnimatedBackground/AnimatedBackground";
import Taskbar from "../Taskbar/Taskbar";

import DesktopCoordinates from "../DesktopLayout/DesktopCoordinates";
import DesktopHeader from "../DesktopLayout/DesktopHeader";
import DesktopHero from "../DesktopLayout/DesktopHero";
import DesktopIcons from "../DesktopLayout/DesktopIcons";

import "./Desktop.css";

export default function Desktop() {
  return (
    <motion.section
      className="desktop"
      initial={{
        opacity: 0,
        scale: 1.015,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        scale: 0.99,
      }}
      transition={{
        duration: 0.65,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      <AnimatedBackground />

      <DesktopHeader />

      <DesktopIcons />

      <DesktopHero />

      <DesktopCoordinates />

      <Taskbar />
    </motion.section>
  );
}