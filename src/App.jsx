import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AnimatePresence } from "framer-motion";

import BinaryMark from "./components/BinaryMark/BinaryMark";
import BootScreen from "./components/BootScreen/BootScreen";
import Cursor from "./components/Cursor/Cursor";
import Desktop from "./components/Desktop/Desktop";
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

const loadProjectViewer = () =>
  import("./components/ProjectViewer/ProjectViewer");

const ProjectViewer = lazy(loadProjectViewer);

export default function App() {
  const [booting, setBooting] = useState(true);
  const [activeProject, setActiveProject] = useState(null);

  const finishBoot = useCallback(() => {
    setBooting(false);
  }, []);

  useEffect(() => {
    return subscribeToProject(setActiveProject);
  }, []);

  useEffect(() => {
    if (booting) return undefined;

    const preload = () => {
      loadProjectViewer().catch(() => {});
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(preload, {
        timeout: 3000,
      });

      return () => window.cancelIdleCallback(idleId);
    }

    const timer = window.setTimeout(preload, 1500);
    return () => window.clearTimeout(timer);
  }, [booting]);

  function showPreviousProject() {
    if (!activeProject || projects.length === 0) {
      return;
    }

    const currentIndex = projects.findIndex(
      (project) => project.id === activeProject.id
    );

    const safeIndex = currentIndex >= 0 ? currentIndex : 0;
    const previousIndex =
      safeIndex === 0 ? projects.length - 1 : safeIndex - 1;

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
      safeIndex === projects.length - 1 ? 0 : safeIndex + 1;

    setActiveProject(projects[nextIndex]);
  }

  return (
    <>
      <Cursor />

      <AnimatePresence mode="wait">
        {booting ? (
          <BootScreen key="boot" onComplete={finishBoot} />
        ) : (
          <main className="site-scroll" key="experience">
            <Desktop />

            <Window />

            <BinaryMark />

            <Suspense fallback={null}>
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
            </Suspense>
          </main>
        )}
      </AnimatePresence>

      {!booting && <SystemActivity />}
    </>
  );
}
