import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaChevronDown,
  FaXmark,
} from "react-icons/fa6";

import ModelViewer from "../ModelViewer/ModelViewer";
import "./ProjectViewer.css";
import "./ModelViewerIntegration.css";
import "./ProjectMedia.css";
import "./ProjectLightbox.css";

const DEFAULT_PROCESS = [
  {
    stage: "RESEARCH",
    description:
      "Problem analysis, references, user needs and contextual investigation.",
  },
  {
    stage: "IDEATION",
    description:
      "Sketch development, form exploration and early concept generation.",
  },
  {
    stage: "PROTOTYPE",
    description:
      "Physical or digital testing used to evaluate proportion and function.",
  },
  {
    stage: "REFINEMENT",
    description:
      "Final development, detailing, material decisions and presentation.",
  },
];

const DEFAULT_SPECS = [
  ["CLASSIFICATION", "INDUSTRIAL DESIGN"],
  ["FILE CONDITION", "STABLE"],
  ["ARCHIVE STATUS", "VERIFIED"],
  ["ACCESS LEVEL", "04"],
];

const TABS = [
  { id: "brief", label: "MISSION BRIEF" },
  { id: "process", label: "PROCESS LOG" },
  { id: "media", label: "MEDIA ARCHIVE" },
  { id: "specs", label: "SYSTEM DATA" },
];

export default function ProjectViewer({
  project,
  onClose,
  onPrevious,
  onNext,
}) {
  const [activeTab, setActiveTab] = useState("brief");
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const gallery = useMemo(() => {
    const images = Array.isArray(project.images)
      ? project.images.filter(Boolean)
      : [];

    if (project.cover && !images.includes(project.cover)) {
      return [project.cover, ...images];
    }

    return images.length > 0
      ? images
      : project.cover
        ? [project.cover]
        : [];
  }, [project]);

  const videos = useMemo(
    () => normalizeVideos(project.videos),
    [project.videos]
  );

  const processSteps = normalizeProcess(project.process);

  const specifications =
    Array.isArray(project.specifications) &&
    project.specifications.length > 0
      ? project.specifications
      : DEFAULT_SPECS;

  const tools =
    Array.isArray(project.tools) && project.tools.length > 0
      ? project.tools
      : ["SKETCHING", "MODELLING", "PROTOTYPING"];

  const clearance =
    project.clearance ??
    String(((Number(project.id) || 1) % 5) + 1).padStart(2, "0");

  const fileNumber = String(project.id ?? 1).padStart(3, "0");

  useEffect(() => {
    setActiveTab("brief");
    setActiveImage(0);
    setLightboxIndex(null);
  }, [project.id]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (lightboxIndex !== null) {
        if (event.key === "Escape") {
          event.preventDefault();
          setLightboxIndex(null);
        }

        if (event.key === "ArrowLeft" && gallery.length > 1) {
          event.preventDefault();
          setLightboxIndex((current) =>
            current === 0 ? gallery.length - 1 : current - 1
          );
        }

        if (event.key === "ArrowRight" && gallery.length > 1) {
          event.preventDefault();
          setLightboxIndex((current) =>
            current === gallery.length - 1 ? 0 : current + 1
          );
        }

        return;
      }

      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gallery.length, lightboxIndex, onClose, onPrevious, onNext]);

  function showPreviousImage() {
    if (gallery.length < 2) return;

    setActiveImage((current) =>
      current === 0 ? gallery.length - 1 : current - 1
    );
  }

  function showNextImage() {
    if (gallery.length < 2) return;

    setActiveImage((current) =>
      current === gallery.length - 1 ? 0 : current + 1
    );
  }

  function showPreviousLightboxImage() {
    if (gallery.length < 2) return;

    setLightboxIndex((current) =>
      current === 0 ? gallery.length - 1 : current - 1
    );
  }

  function showNextLightboxImage() {
    if (gallery.length < 2) return;

    setLightboxIndex((current) =>
      current === gallery.length - 1 ? 0 : current + 1
    );
  }

  return (
    <motion.section
      className="dossier"
      initial={{
        opacity: 0,
        scale: 1.015,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.985,
        filter: "blur(9px)",
      }}
      transition={{
        duration: 0.34,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      aria-label={`${project.title} classified project file`}
    >
      <div className="dossier__noise" />
      <div className="dossier__scanlines" />
      <div className="dossier__edge-glow" />

      <header className="dossier__topbar">
        <div className="dossier__identity">
          <span className="dossier__status-light" />

          <div>
            <span>MAGI ARCHIVE / CLASSIFIED DESIGN FILE</span>
            <strong>
              SUBJECT {fileNumber}: {project.title}
            </strong>
          </div>
        </div>

        <div className="dossier__top-data">
          <span>
            CLEARANCE
            <strong>LVL {clearance}</strong>
          </span>

          <span>
            FILE STATE
            <strong>ACTIVE</strong>
          </span>
        </div>

    <div className="dossier__controls">
  <button
    type="button"
    onClick={onPrevious}
    data-cursor="PREVIOUS PROJECT"
    aria-label="Previous project"
    title="Previous project"
  >
    <FaArrowLeft />
  </button>

  <button
    type="button"
    onClick={onNext}
    data-cursor="NEXT PROJECT"
    aria-label="Next project"
    title="Next project"
  >
    <FaArrowRight />
  </button>

  <button
    type="button"
    onClick={onClose}
    data-cursor="CLOSE DOSSIER"
    aria-label="Close project"
    title="Close project"
  >
    <FaXmark />
  </button>
</div>
      </header>

      <div className="dossier__workspace">
        <aside className="dossier__sidebar">
          <section className="dossier__subject-card">
            <header>
              <span>SUBJECT IDENTIFICATION</span>
              <strong>A-{fileNumber}</strong>
            </header>

            <div
              className={`dossier__subject-preview${
                project.model ? " dossier__subject-preview--model" : ""
              }`}
            >
              {project.model ? (
                <ModelViewer
                  src={project.model}
                  label={project.title}
                  accent="#a88bff"
                  fit={project.modelFit ?? 1.65}
                  rotation={project.modelRotation ?? [0, 0, 0]}
                />
              ) : project.cover ? (
                <img
                  src={project.cover}
                  alt={`${project.title} thumbnail`}
                />
              ) : (
                <div className="dossier__missing-image">
                  NO IMAGE
                </div>
              )}

              <span className="dossier__scan-corner dossier__scan-corner--one" />
              <span className="dossier__scan-corner dossier__scan-corner--two" />
              <span className="dossier__scan-corner dossier__scan-corner--three" />
              <span className="dossier__scan-corner dossier__scan-corner--four" />
            </div>

            <dl className="dossier__identity-table">
              <div>
                <dt>NAME</dt>
                <dd>{project.title}</dd>
              </div>

              <div>
                <dt>TYPE</dt>
                <dd>{project.category ?? "DESIGN FILE"}</dd>
              </div>

              <div>
                <dt>DATE</dt>
                <dd>{project.year ?? "UNKNOWN"}</dd>
              </div>

              <div>
                <dt>STATUS</dt>
                <dd className="dossier__green">VERIFIED</dd>
              </div>

              <div>
                <dt>THREAT</dt>
                <dd>LOW / CREATIVE</dd>
              </div>
            </dl>
          </section>

          <section className="dossier__sidebar-block">
            <p>ASSIGNED TOOLS</p>

            <div className="dossier__tags">
              {tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </section>

          <section className="dossier__telemetry">
            <header>
              <span>FILE TELEMETRY</span>
              <strong>LIVE</strong>
            </header>

            <div className="dossier__telemetry-chart">
              {Array.from({ length: 18 }, (_, index) => (
                <i
                  key={index}
                  style={{
                    "--height": `${
                      18 + ((index * 31 + Number(project.id || 1) * 7) % 72)
                    }%`,
                    "--delay": `${index * -0.08}s`,
                  }}
                />
              ))}
            </div>

            <footer>
              <span>INTEGRITY 98%</span>
              <span>SYNC 004MS</span>
            </footer>
          </section>
        </aside>

        <main className="dossier__main">
          <section className="dossier__hero">
            <AnimatePresence mode="wait">
              {gallery.length > 0 ? (
                <motion.img
                  key={gallery[activeImage]}
                  src={gallery[activeImage]}
                  alt={`${project.title} view ${activeImage + 1}`}
                  initial={{
                    opacity: 0,
                    scale: 1.03,
                    filter: "blur(8px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.985,
                    filter: "blur(5px)",
                  }}
                  transition={{ duration: 0.28 }}
                />
              ) : (
                <motion.div
                  key="missing"
                  className="dossier__hero-placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <span>VISUAL DATA UNAVAILABLE</span>
                  <strong>NO MEDIA DETECTED</strong>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="dossier__hero-grid" />
            <div className="dossier__hero-scan" />

            <div className="dossier__hero-label">
              <span>
                PRIMARY VISUAL /
                {String(activeImage + 1).padStart(2, "0")}
              </span>

              <strong>
                FILE_{fileNumber}
              </strong>
            </div>

            {gallery.length > 1 && (
              <div className="dossier__image-controls">
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous image"
                >
                  <FaArrowLeft />
                </button>

                <span>
                  {String(activeImage + 1).padStart(2, "0")}
                  /
                  {String(gallery.length).padStart(2, "0")}
                </span>

                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next image"
                >
                  <FaArrowRight />
                </button>
              </div>
            )}
          </section>

          <section className="dossier__heading">
            <div>
              <p>SUBJECT A-{fileNumber}</p>
              <h1>{project.title}</h1>
            </div>

            <div className="dossier__classification">
              <span>DESIGN CLASS</span>
              <strong>
                {project.category ?? "UNCLASSIFIED"}
              </strong>
            </div>
          </section>

          <nav
            className="dossier__tabs"
            aria-label="Project dossier sections"
          >
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                type="button"
                className={
                  activeTab === tab.id
                    ? "dossier__tab dossier__tab--active"
                    : "dossier__tab"
                }
                onClick={() => setActiveTab(tab.id)}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                {tab.label}
              </button>
            ))}
          </nav>

          <div className="dossier__tab-content">
            <AnimatePresence mode="wait">
              {activeTab === "brief" && (
                <BriefPanel
                  key="brief"
                  project={project}
                  fileNumber={fileNumber}
                />
              )}

              {activeTab === "process" && (
                <ProcessPanel
                  key="process"
                  processSteps={processSteps}
                />
              )}

              {activeTab === "media" && (
                <MediaPanel
                  key="media"
                  project={project}
                  gallery={gallery}
                  videos={videos}
                  onOpenImage={setLightboxIndex}
                />
              )}

              {activeTab === "specs" && (
                <SpecsPanel
                  key="specs"
                  project={project}
                  specifications={specifications}
                  tools={tools}
                  clearance={clearance}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && gallery[lightboxIndex] && (
          <MediaLightbox
            key={`${project.id}-${lightboxIndex}`}
            project={project}
            gallery={gallery}
            activeIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onPrevious={showPreviousLightboxImage}
            onNext={showNextLightboxImage}
          />
        )}
      </AnimatePresence>

      <footer className="dossier__footer">
        <span>
          MAGI DRIVE / SUBJECT_{fileNumber}
        </span>

        <strong>
          CLASSIFIED FILE ACCESS GRANTED
        </strong>

        <span>
          ← → NAVIGATE / ESC CLOSE
        </span>
      </footer>
    </motion.section>
  );
}

function Panel({ children, className = "" }) {
  return (
    <motion.section
      className={`dossier-panel ${className}`}
      initial={{
        opacity: 0,
        y: 12,
        filter: "blur(5px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        y: -8,
        filter: "blur(4px)",
      }}
      transition={{
        duration: 0.24,
        ease: [0.2, 0.8, 0.2, 1],
      }}
    >
      {children}
    </motion.section>
  );
}

function BriefPanel({ project, fileNumber }) {
  return (
    <Panel className="dossier-brief">
      <article className="dossier-brief__main">
        <p>MISSION BRIEF</p>

        <h2>
          PROJECT OBJECTIVE /
          <br />
          SUBJECT {fileNumber}
        </h2>

        <div className="dossier-brief__description">
          {project.description ??
            "Project description currently being recovered from the MAGI design archive. Add a description inside projects.js to replace this message."}
        </div>
      </article>

      <aside className="dossier-brief__analysis">
        <header>
          <span>ASSESSMENT</span>
          <strong>POSITIVE</strong>
        </header>

        <dl>
          <div>
            <dt>FORM QUALITY</dt>
            <dd>87 / 100</dd>
          </div>

          <div>
            <dt>FUNCTION</dt>
            <dd>92 / 100</dd>
          </div>

          <div>
            <dt>DEVELOPMENT</dt>
            <dd>ACTIVE</dd>
          </div>

          <div>
            <dt>ARCHIVE VALUE</dt>
            <dd>HIGH</dd>
          </div>
        </dl>
      </aside>

      <article className="dossier-brief__notes">
        <header>
          <span>ARCHIVE NOTES</span>
          <strong>RECOVERED TEXT</strong>
        </header>

        <p>
          {project.notes ??
            "This project file can include further context, design decisions, challenges, outcomes and reflections."}
        </p>
      </article>
    </Panel>
  );
}

function ProcessPanel({ processSteps }) {
  return (
    <Panel className="dossier-process">
      <header className="dossier-panel__header">
        <div>
          <p>DEVELOPMENT RECORD</p>
          <h2>PROCESS LOG</h2>
        </div>

        <span>{processSteps.length} STAGES VERIFIED</span>
      </header>

      <div className="dossier-process__timeline">
        {processSteps.map((step, index) => (
          <motion.article
            key={`${step.stage}-${index}`}
            initial={{
              opacity: 0,
              x: -12,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.07,
            }}
          >
            <div className="dossier-process__number">
              {String(index + 1).padStart(2, "0")}
            </div>

            <div className="dossier-process__line">
              <i />
            </div>

            <div className="dossier-process__copy">
              <span>
                STAGE_{String(index + 1).padStart(2, "0")}
              </span>

              <h3>{step.stage}</h3>

              <p>{step.description}</p>
            </div>

            <strong>COMPLETE</strong>
          </motion.article>
        ))}
      </div>
    </Panel>
  );
}

function MediaPanel({
  project,
  gallery,
  videos,
  onOpenImage,
}) {
  const mediaCount = gallery.length + videos.length;

  return (
    <Panel className="dossier-media">
      <header className="dossier-panel__header">
        <div>
          <p>VISUAL INTELLIGENCE</p>
          <h2>MEDIA ARCHIVE</h2>
        </div>

        <span>{mediaCount} FILES DETECTED</span>
      </header>

      {mediaCount > 0 ? (
        <div className="dossier-media__grid">
          {gallery.map((image, index) => (
            <motion.button
              key={`${image}-${index}`}
              type="button"
              onClick={() => onOpenImage(index)}
              data-cursor="VIEW FULL IMAGE"
              aria-label={`Open ${project.title} image ${index + 1}`}
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.04,
              }}
            >
              <img
                src={image}
                alt={`${project.title} archive ${index + 1}`}
              />

              <span>
                VIEW_{String(index + 1).padStart(2, "0")}
              </span>

              <strong>OPEN FILE</strong>
            </motion.button>
          ))}

          {videos.map((video, index) => (
            <motion.article
              className="dossier-media__video"
              key={`${video.src}-${index}`}
              initial={{
                opacity: 0,
                y: 14,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: (gallery.length + index) * 0.04,
              }}
            >
              <video
                controls
                playsInline
                preload="metadata"
                poster={video.poster}
                aria-label={video.title}
              >
                <source
                  src={video.src}
                  type={video.type}
                />

                Your browser does not support embedded video.
              </video>

              <div className="dossier-media__video-data">
                <span>
                  VIDEO_{String(index + 1).padStart(2, "0")}
                </span>

                <strong>{video.title}</strong>
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="dossier-media__empty">
          <span>MEDIA DIRECTORY EMPTY</span>
          <strong>ADD IMAGES TO PROJECTS.JS</strong>
        </div>
      )}
    </Panel>
  );
}

function MediaLightbox({
  project,
  gallery,
  activeIndex,
  onClose,
  onPrevious,
  onNext,
}) {
  const image = gallery[activeIndex];
  const imageNumber = String(activeIndex + 1).padStart(2, "0");
  const imageTotal = String(gallery.length).padStart(2, "0");

  return (
    <motion.div
      className="media-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} full image viewer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="media-lightbox__scanlines" aria-hidden="true" />

      <header className="media-lightbox__header">
        <div>
          <span>MAGI MEDIA VIEWER</span>
          <strong>{project.title}</strong>
        </div>

        <div className="media-lightbox__counter">
          IMAGE {imageNumber} / {imageTotal}
        </div>

        <button
          type="button"
          onClick={onClose}
          data-cursor="CLOSE IMAGE"
          aria-label="Close full image"
          autoFocus
        >
          <FaXmark />
        </button>
      </header>

      <div className="media-lightbox__stage">
        {gallery.length > 1 && (
          <button
            className="media-lightbox__nav media-lightbox__nav--previous"
            type="button"
            onClick={onPrevious}
            data-cursor="PREVIOUS IMAGE"
            aria-label="Previous image"
          >
            <FaArrowLeft />
          </button>
        )}

        <div className="media-lightbox__image-frame">
          <AnimatePresence mode="wait">
            <motion.img
              key={image}
              src={image}
              alt={`${project.title} archive view ${activeIndex + 1}`}
              initial={{
                opacity: 0,
                scale: 0.975,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.985,
                filter: "blur(4px)",
              }}
              transition={{ duration: 0.24 }}
            />
          </AnimatePresence>
        </div>

        {gallery.length > 1 && (
          <button
            className="media-lightbox__nav media-lightbox__nav--next"
            type="button"
            onClick={onNext}
            data-cursor="NEXT IMAGE"
            aria-label="Next image"
          >
            <FaArrowRight />
          </button>
        )}
      </div>

      <footer className="media-lightbox__footer">
        <span>FULL RESOLUTION ARCHIVE VIEW</span>
        <strong>← → NAVIGATE / ESC CLOSE</strong>
        <span>FILE_{imageNumber}</span>
      </footer>
    </motion.div>
  );
}

function SpecsPanel({
  project,
  specifications,
  tools,
  clearance,
}) {
  return (
    <Panel className="dossier-specs">
      <header className="dossier-panel__header">
        <div>
          <p>TECHNICAL RECORD</p>
          <h2>SYSTEM DATA</h2>
        </div>

        <span>ACCESS LEVEL {clearance}</span>
      </header>

      <div className="dossier-specs__layout">
        <section>
          <header>
            <span>DESIGN SPECIFICATIONS</span>
            <strong>VERIFIED</strong>
          </header>

          <dl>
            {specifications.map((specification, index) => {
              const [label, value] = Array.isArray(specification)
                ? specification
                : [
                    specification.label,
                    specification.value,
                  ];

              return (
                <div key={`${label}-${index}`}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              );
            })}

            <div>
              <dt>PROJECT YEAR</dt>
              <dd>{project.year ?? "UNKNOWN"}</dd>
            </div>

            <div>
              <dt>CATEGORY</dt>
              <dd>{project.category ?? "DESIGN"}</dd>
            </div>
          </dl>
        </section>

        <section>
          <header>
            <span>TOOLS AND MATERIALS</span>
            <strong>{tools.length} ITEMS</strong>
          </header>

          <div className="dossier-specs__tools">
            {tools.map((tool, index) => (
              <article key={tool}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{tool}</strong>

                <i />
              </article>
            ))}
          </div>
        </section>
      </div>
    </Panel>
  );
}

function normalizeProcess(process) {
  if (!Array.isArray(process) || process.length === 0) {
    return DEFAULT_PROCESS;
  }

  return process.map((step) => {
    if (typeof step === "string") {
      return {
        stage: step,
        description:
          "Development information currently being indexed.",
      };
    }

    return {
      stage: step.stage ?? step.title ?? "PROCESS STAGE",
      description:
        step.description ??
        step.text ??
        "Development information currently being indexed.",
    };
  });
}

function normalizeVideos(videos) {
  if (!Array.isArray(videos)) {
    return [];
  }

  return videos
    .filter(Boolean)
    .map((video, index) => {
      if (typeof video === "string") {
        return {
          src: video,
          title: `ARCHIVE VIDEO ${String(index + 1).padStart(2, "0")}`,
          type: "video/mp4",
          poster: undefined,
        };
      }

      return {
        src: video.src,
        title:
          video.title ??
          `ARCHIVE VIDEO ${String(index + 1).padStart(2, "0")}`,
        type: video.type ?? "video/mp4",
        poster: video.poster,
      };
    })
    .filter((video) => Boolean(video.src));
}
