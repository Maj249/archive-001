import { motion } from "framer-motion";

import { closeApp } from "../../system/windowManager";
import { openProject } from "../../system/projectManager";
import ProjectGlyph from "./ProjectGlyphs";

export default function ProjectShortcut({ project, index }) {
  function handleOpen() {
    closeApp();
    openProject(project);
  }

  const fileNumber = String(project.id ?? index + 1).padStart(3, "0");

  return (
    <motion.button
      className="project-shortcut"
      type="button"
      onClick={handleOpen}
      data-cursor="OPEN PROJECT"
      aria-label={`Open ${project.title}`}
      style={{ "--project-index": index }}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.45,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      whileTap={{ scale: 0.975 }}
    >
      <span className="project-shortcut__index">
        SUBJECT_{fileNumber}
      </span>

      <div className="project-shortcut__stage" aria-hidden="true">
        <div className="project-shortcut__illustration">
          <ProjectGlyph project={project} />
        </div>

        <span className="project-shortcut__orbit project-shortcut__orbit--one" />
        <span className="project-shortcut__orbit project-shortcut__orbit--two" />
        <span className="project-shortcut__scan" />
      </div>

      <span className="project-shortcut__copy">
        <strong>{project.title}</strong>
        <small>{project.category ?? "DESIGN PROJECT"}</small>
      </span>

      <span className="project-shortcut__status">
        <i /> PROJECT ONLINE
      </span>
    </motion.button>
  );
}
