import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import BinaryMark from "./components/BinaryMark/BinaryMark";
import BootScreen from "./components/BootScreen/BootScreen";
import Cursor from "./components/Cursor/Cursor";
import Desktop from "./components/Desktop/Desktop";
import ProjectViewer from "./components/ProjectViewer/ProjectViewer";
import SystemActivity from "./components/SystemActivity/SystemActivity";
import Window from "./components/Window/Window";

import { projects } from "./data/projects";

import {
  closeProject,
  subscribeToProject,
} from "./system/projectManager";

import "./styles/compatibility.css";
import "./styles/readability.css";
import "./styles/mobile.css";

export default function App() {
  const [booting, setBooting] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  const finishBoot = useCallback(() => {
    setBooting(false);
  }, []);

  useEffect(() => {
    return subscribeToProject(setActiveProject);
  }, []);

  function showPreviousProject() {
    if (!activeProject || projects.length === 0) {
      return;
    }

    const currentIndex = projects.findIndex(
      (project) => project.id === activeProject.id
    );

    const safeIndex = currentIndex >= 0 ? currentIndex : 0;

    const previousIndex =
      safeIndex === 0
        ? projects.length - 1
        : safeIndex - 1;

    setActiveProject(projects[previousIndex]);
  }

  function showNextProject() {
    if (!activeProject || projects.length === 0) {
      return;
    }

    const currentIndex = projects.findIndex(
      (project) => project.id === activeProject.id
    );

    const safeIndex = currentIndex >= 0 ? currentIndex : 0;

    const nextIndex =
      safeIndex === projects.length - 1
        ? 0
        : safeIndex + 1;

    setActiveProject(projects[nextIndex]);
  }

  return (
    <>
      <Cursor />

      <AnimatePresence mode="wait">
        {booting ? (
          <BootScreen
            key="boot"
            onComplete={finishBoot}
          />
        ) : (
          <main
            className="site-scroll"
            key="experience"
          >
            <Desktop />

            <Window />

            <BinaryMark />

            <AnimatePresence>
              {activeProject && (
                <ProjectViewer
                  key={activeProject.id}
                  project={activeProject}
                  onClose={closeProject}
                  onPrevious={showPreviousProject}
                  onNext={showNextProject}
                />
              )}
            </AnimatePresence>
          </main>
        )}
      </AnimatePresence>

      {!booting && <SystemActivity />}
    </>
  );
}