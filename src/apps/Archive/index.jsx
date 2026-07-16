import { motion } from "framer-motion";

import { projects } from "../../data/projects";
import { closeApp } from "../../system/windowManager";
import { openProject } from "../../system/projectManager";

export default function Archive() {
  function handleOpenProject(project) {
    closeApp();
    openProject(project);
  }

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
            key={project.id}
            type="button"
            className="project-card"
            data-cursor="OPEN PROJECT"
            onClick={() => handleOpenProject(project)}
            initial={{
              opacity: 0,
              y: 16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: index * 0.05,
            }}
            whileHover={{
              y: -6,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <div className="project-card__image">
              {project.cover ? (
                <img
                  src={project.cover}
                  alt={project.title}
                />
              ) : (
                <div className="project-card__placeholder">
                  <span>
                    FILE_
                    {String(project.id).padStart(2, "0")}
                  </span>

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