import { useMemo } from "react";
import { motion } from "framer-motion";

import { projects } from "../../data/projects";
import { closeApp } from "../../system/windowManager";
import { openProject } from "../../system/projectManager";

import "./Collection.css";

function normalise(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

function getProjectLabels(project) {
  const tags = Array.isArray(project.tags)
    ? project.tags
    : project.tags
      ? [project.tags]
      : [];

  return [project.category, ...tags]
    .map(normalise)
    .filter(Boolean);
}

function matchesCollection(project, filters) {
  if (!filters?.length) {
    return true;
  }

  const labels = getProjectLabels(project);
  const terms = filters.map(normalise);

  return labels.some((label) =>
    terms.some(
      (term) => label === term || label.includes(term) || term.includes(label)
    )
  );
}

function sortNewestFirst(items) {
  return [...items].sort((a, b) => {
    const yearDifference = Number(b.year || 0) - Number(a.year || 0);

    if (yearDifference !== 0) {
      return yearDifference;
    }

    return String(a.title).localeCompare(String(b.title));
  });
}

export default function Collection({
  title,
  code,
  description,
  filters = [],
}) {
  const matchingProjects = useMemo(() => {
    return sortNewestFirst(
      projects.filter((project) => matchesCollection(project, filters))
    );
  }, [filters]);

  function handleOpenProject(project) {
    closeApp();
    openProject(project);
  }

  return (
    <section className="collection-app">
      <header className="collection-app__header">
        <div>
          <p>MAGI DRIVE / LIVE COLLECTION</p>
          <h2>{title}</h2>
          <span>{description}</span>
        </div>

        <div className="collection-app__summary">
          <span>{code}</span>
          <strong>{String(matchingProjects.length).padStart(2, "0")}</strong>
          <small>FILES INDEXED</small>
        </div>
      </header>

      <div className="collection-app__path">
        <span>/MAGI/ARCHIVE/{title}</span>
        <span>VIEW: NEWEST_FIRST</span>
        <i />
        <strong>LIVE</strong>
      </div>

      {matchingProjects.length > 0 ? (
        <div className="collection-app__grid">
          {matchingProjects.map((project, index) => (
            <motion.button
              className="collection-card"
              type="button"
              key={project.slug || project.id}
              data-cursor="OPEN DOSSIER"
              onClick={() => handleOpenProject(project)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.055 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.985 }}
            >
              <div className="collection-card__media">
                {project.cover ? (
                  <img src={project.cover} alt={project.title} />
                ) : (
                  <div className="collection-card__placeholder">
                    <span>PREVIEW_UNAVAILABLE</span>
                    <strong>
                      {String(project.id).padStart(2, "0")}
                    </strong>
                  </div>
                )}

                <span className="collection-card__index">
                  FILE_{String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="collection-card__body">
                <div>
                  <p>{project.category || "UNCATEGORISED"}</p>
                  <h3>{project.title}</h3>
                </div>

                <time>{project.year || "----"}</time>
              </div>

              <footer className="collection-card__footer">
                <span>OPEN DOSSIER</span>
                <span>↗</span>
              </footer>
            </motion.button>
          ))}
        </div>
      ) : (
        <div className="collection-app__empty">
          <div className="collection-app__empty-mark">∅</div>

          <div>
            <p>NO MATCHING FILES FOUND</p>
            <h3>THIS COLLECTION IS READY FOR YOUR WORK.</h3>
            <span>
              Add a matching category or tag to a project in
              src/data/projects.js.
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

