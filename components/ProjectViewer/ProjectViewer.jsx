import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaXmark } from "react-icons/fa6";
import "./ProjectViewer.css";

export default function ProjectViewer({ project, onClose, onPrevious, onNext }) {
  if (!project) return null;

  return (
    <motion.section
      className="project-viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="project-viewer__topbar">
        <div>
          <span>MAGI DRIVE</span>
          <strong>{project.title}</strong>
        </div>

        <div className="project-viewer__controls">
          <button type="button" onClick={onPrevious} data-cursor="prev"><FaArrowLeft /></button>
          <button type="button" onClick={onNext} data-cursor="next"><FaArrowRight /></button>
          <button type="button" onClick={onClose} data-cursor="close"><FaXmark /></button>
        </div>
      </header>

      <div className="project-viewer__scroll">
        <section className="project-viewer__hero">
          <ImageFrame image={project.cover} label={`${project.title}_COVER`} />

          <div className="project-viewer__title">
            <p>{project.category} / {project.year}</p>
            <h1>{project.title}</h1>
          </div>
        </section>

        <section className="project-viewer__info">
          <div>
            <p className="project-viewer__label">PROJECT INFORMATION</p>
            <p className="project-viewer__description">{project.description}</p>
          </div>

          <div className="project-viewer__meta">
            <div><span>YEAR</span><strong>{project.year}</strong></div>
            <div><span>CATEGORY</span><strong>{project.category}</strong></div>
            <div>
              <span>TOOLS / PROCESS</span>
              <ul>
                {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="project-viewer__gallery">
          {project.images.map((image, index) => (
            <motion.div
              key={`${project.id}-${index}`}
              className={index === 0 ? "project-viewer__item project-viewer__item--large" : "project-viewer__item"}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
            >
              <ImageFrame image={image} label={`${project.title}_IMAGE_0${index + 1}`} />
            </motion.div>
          ))}
        </section>

        <footer className="project-viewer__footer">
          <p>END OF FILE</p>
          <button type="button" onClick={onNext} data-cursor="next">
            NEXT PROJECT <FaArrowRight />
          </button>
        </footer>
      </div>
    </motion.section>
  );
}

function ImageFrame({ image, label }) {
  return (
    <div className="project-image">
      {image ? (
        <img src={image} alt={label} />
      ) : (
        <>
          <span>{label}</span>
          <small>IMAGE_PENDING</small>
        </>
      )}
    </div>
  );
}
