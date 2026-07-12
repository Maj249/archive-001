import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import BootScreen from "./components/BootScreen/BootScreen";
import Cursor from "./components/Cursor/Cursor";
import Desktop from "./components/Desktop/Desktop";

export default function App() {
  const [booting, setBooting] = useState(true);
  const finishBoot = useCallback(() => setBooting(false), []);

  return (
    <>
      <Cursor />
      <AnimatePresence mode="wait">
        {booting ? (
          <BootScreen key="boot" onComplete={finishBoot} />
        ) : (
          <Desktop key="desktop" />
        )}
      </AnimatePresence>
    </>
  );
}
