import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaCube,
  FaEnvelope,
  FaFilePdf,
  FaFlask,
  FaFolderOpen,
  FaImage,
  FaPenRuler,
  FaTrashCan,
} from "react-icons/fa6";

import AnimatedBackground from "../AnimatedBackground/AnimatedBackground";
import DesktopIcon from "../DesktopIcon/DesktopIcon";
import ProjectViewer from "../ProjectViewer/ProjectViewer";
import Taskbar from "../Taskbar/Taskbar";
import Window from "../Window/Window";
import { projects } from "../../data/projects";
import "./Desktop.css";

const desktopItems = [
  { id: "archive", label: "ARCHIVE_001", Icon: FaFolderOpen, accent: "green" },
  { id: "sketchbooks", label: "SKETCHBOOKS", Icon: FaPenRuler, accent: "white" },
  { id: "objects", label: "OBJECTS", Icon: FaCube, accent: "purple" },
  { id: "experiments", label: "EXPERIMENTS", Icon: FaFlask, accent: "green" },
  { id: "photography", label: "PHOTOGRAPHY", Icon: FaImage, accent: "white" },
  { id: "resume", label: "RESUME.PDF", Icon: FaFilePdf, accent: "purple" },
  { id: "contact", label: "CONTACT.EXE", Icon: FaEnvelope, accent: "green" },
  { id: "bin", label: "RECYCLE BIN", Icon: FaTrashCan, accent: "white" },
];

export default function Desktop() {
  const [activeWindow, setActiveWindow] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  function openItem(id) {
    setActiveWindow(id);
  }

  function closeWindow() {
    setActiveWindow(null);
  }

  function openProject(project) {
    setSelectedProject(project);
  }

  function closeProject() {
    setSelectedProject(null);
  }

  function showPreviousProject() {
    if (!selectedProject) return;

    const currentIndex = projects.findIndex((project) => project.id === selectedProject.id);
    setSelectedProject(projects[currentIndex === 0 ? projects.length - 1 : currentIndex - 1]);
  }

  function showNextProject() {
    if (!selectedProject) return;

    const currentIndex = projects.findIndex((project) => project.id === selectedProject.id);
    setSelectedProject(projects[currentIndex === projects.length - 1 ? 0 : currentIndex + 1]);
  }

  return (
    <motion.main
      className="desktop"
      initial={{ opacity: 0, scale: 1.02 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7 }}
    >
      <AnimatedBackground />

      <header className="desktop__system-header">
        <div>
          <span>PROJECT:</span>
          <strong>ARCHIVE_001</strong>
        </div>

        <div className="desktop__system-meta">
          <span>PROPERTY OF MAGI LABS</span>
          <span>BUILD 002</span>
        </div>
      </header>

      <section className="desktop__icon-grid" aria-label="Desktop files">
        {desktopItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.07 * index }}
          >
            <DesktopIcon {...item} onOpen={() => openItem(item.id)} />
          </motion.div>
        ))}
      </section>

      <section className="desktop__hero">
        <p>CREATIVE OPERATING SYSTEM</p>
        <h1>
          MAGI'S
          <br />
          WORK_OS
        </h1>

        <div className="desktop__hero-footer">
          <span>SELECT A FILE TO BEGIN</span>
          <span>STATUS: ONLINE</span>
        </div>
      </section>

      <div className="desktop__coordinates">
        <span>X: 0145</span>
        <span>Y: 0821</span>
        <span>SYS: STABLE</span>
      </div>

      <AnimatePresence>
        {activeWindow === "archive" && (
          <Window
            key="archive"
            title="ARCHIVE_001"
            onClose={closeWindow}
            onMinimise={closeWindow}
          >
            <ArchiveContent onOpenProject={openProject} />
          </Window>
        )}

        {activeWindow && activeWindow !== "archive" && (
          <Window
            key={activeWindow}
            title={getWindowTitle(activeWindow)}
            onClose={closeWindow}
            onMinimise={closeWindow}
            width={540}
          >
            <PlaceholderContent title={activeWindow} />
          </Window>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedProject && (
          <ProjectViewer
            key={selectedProject.id}
            project={selectedProject}
            onClose={closeProject}
            onPrevious={showPreviousProject}
            onNext={showNextProject}
          />
        )}
      </AnimatePresence>

      <Taskbar />
    </motion.main>
  );
}

function ArchiveContent({ onOpenProject }) {
  return (
    <div className="archive">
      <header className="archive__header">
        <div>
          <p>MAGI DRIVE / RECOVERED MATERIAL</p>
          <h2>ARCHIVE_001</h2>
        </div>
        <span>{projects.length} FILES FOUND</span>
      </header>

      <div className="archive__grid">
        {projects.map((project, index) => (
          <motion.button
            className="project-card"
            type="button"
            key={project.id}
            onClick={() => onOpenProject(project)}
            data-cursor="view"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
          >
            <div className="project-card__image">
              {project.cover ? (
                <img src={project.cover} alt={project.title} />
              ) : (
                <div className="project-card__placeholder">
                  <span>FILE_{String(project.id).padStart(2, "0")}</span>
                  <strong>NO PREVIEW</strong>
                </div>
              )}

              <span className="project-card__number">
                {String(project.id).padStart(2, "0")}
              </span>
            </div>

            <div className="project-card__details">
              <h3>{project.title}</h3>
              <p>{project.category}</p>
              <span>{project.year}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function PlaceholderContent({ title }) {
  const content = {
    sketchbooks: ["SKETCH MATERIAL CURRENTLY BEING INDEXED.", "DRAWINGS / IDEAS / DEVELOPMENT"],
    objects: ["OBJECT FILES CURRENTLY BEING INDEXED.", "PRODUCTS / MODELS / BUILDS"],
    experiments: ["EXPERIMENTAL DATA CURRENTLY BEING INDEXED.", "TESTS / MATERIALS / PROTOTYPES"],
    photography: ["PHOTOGRAPHIC MATERIAL CURRENTLY BEING INDEXED.", "IMAGES / DOCUMENTATION / FIELD NOTES"],
    resume: ["RESUME.PDF WILL BE ADDED BEFORE RELEASE.", "DOCUMENT CURRENTLY UNAVAILABLE"],
    contact: ["CONTACT TERMINAL COMING ONLINE SOON.", "EMAIL / INSTAGRAM / LINKEDIN"],
    bin: ["NOTHING DELETED.", "EVERY BAD IDEA MAY BECOME A GOOD ONE"],
  };

  const [heading, status] = content[title] ?? [
    "DIRECTORY CURRENTLY UNAVAILABLE.",
    "STATUS UNKNOWN"
  ];

  return (
    <div className="placeholder-window">
      <p>DIRECTORY: {title.toUpperCase()}</p>
      <h2>{heading}</h2>
      <span>{status}</span>
    </div>
  );
}

function getWindowTitle(id) {
  return desktopItems.find((item) => item.id === id)?.label ?? id.toUpperCase();
}
