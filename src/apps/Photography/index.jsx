import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaXmark,
} from "react-icons/fa6";

import photography from "../../data/photography";

import "./Photography.css";
import "./PhotographyLightbox.css";

export default function Photography() {
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        setActiveIndex(null);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null || photography.length < 2) return;

    const nextIndex =
      activeIndex === photography.length - 1 ? 0 : activeIndex + 1;
    const previousIndex =
      activeIndex === 0 ? photography.length - 1 : activeIndex - 1;

    [photography[nextIndex], photography[previousIndex]].forEach((photo) => {
      const preload = new Image();
      preload.src = photo.src;
    });
  }, [activeIndex]);

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null || current === 0) {
        return photography.length - 1;
      }

      return current - 1;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null || current === photography.length - 1) {
        return 0;
      }

      return current + 1;
    });
  }

  const lightbox =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {activeIndex !== null && photography[activeIndex] && (
              <PhotographyLightbox
                key="photography-lightbox"
                photo={photography[activeIndex]}
                activeIndex={activeIndex}
                total={photography.length}
                onClose={() => setActiveIndex(null)}
                onPrevious={showPrevious}
                onNext={showNext}
              />
            )}
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <section className="photography-app">
      <header className="photography-app__header">
        <div>
          <p>MAGI DRIVE / IMAGE DIRECTORY</p>
          <h2>PHOTOGRAPHY</h2>
        </div>

        <div className="photography-app__count">
          <strong>{String(photography.length).padStart(2, "0")}</strong>
          <span>IMAGES ONLINE</span>
        </div>
      </header>

      <div className="photography-app__status">
        <span>/MAGI/PHOTOGRAPHY</span>
        <i />
        <strong>CLICK AN IMAGE TO EXPAND</strong>
      </div>

      <div className="photography-app__gallery">
        {photography.map((photo, index) => (
          <motion.button
            className="photography-card"
            type="button"
            key={photo.id}
            onClick={() => setActiveIndex(index)}
            data-cursor="VIEW FULL IMAGE"
            aria-label={`Open photography image ${index + 1}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: Math.min(index * 0.025, 0.35),
              duration: 0.36,
            }}
            whileTap={{ scale: 0.99 }}
          >
            <img
              src={photo.thumbnail}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
            />

            <span>IMAGE_{photo.id}</span>
          </motion.button>
        ))}
      </div>

      {lightbox}
    </section>
  );
}

function PhotographyLightbox({
  photo,
  activeIndex,
  total,
  onClose,
  onPrevious,
  onNext,
}) {
  const number = String(activeIndex + 1).padStart(2, "0");
  const count = String(total).padStart(2, "0");

  return (
    <motion.section
      className="photography-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`Photography image ${activeIndex + 1} of ${total}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="photography-lightbox__scanlines" aria-hidden="true" />

      <header className="photography-lightbox__header">
        <div>
          <span>MAGI IMAGE VIEWER</span>
          <strong>PHOTOGRAPHY</strong>
        </div>

        <p>IMAGE {number} / {count}</p>

        <button
          type="button"
          onClick={onClose}
          data-cursor="CLOSE IMAGE"
          aria-label="Close photography image"
          autoFocus
        >
          <FaXmark />
        </button>
      </header>

      <div
        className="photography-lightbox__stage"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <button
          className="photography-lightbox__nav photography-lightbox__nav--previous"
          type="button"
          onClick={onPrevious}
          data-cursor="PREVIOUS IMAGE"
          aria-label="Previous photography image"
        >
          <FaArrowLeft />
        </button>

        <div className="photography-lightbox__image-frame">
          <AnimatePresence mode="wait">
            <motion.img
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              initial={{
                opacity: 0,
                scale: 0.98,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.99,
                filter: "blur(4px)",
              }}
              transition={{ duration: 0.24 }}
            />
          </AnimatePresence>
        </div>

        <button
          className="photography-lightbox__nav photography-lightbox__nav--next"
          type="button"
          onClick={onNext}
          data-cursor="NEXT IMAGE"
          aria-label="Next photography image"
        >
          <FaArrowRight />
        </button>
      </div>

      <footer className="photography-lightbox__footer">
        <span>FULL IMAGE VIEW</span>
        <strong>← → NAVIGATE / ESC CLOSE</strong>
        <span>FILE_{number}</span>
      </footer>
    </motion.section>
  );
}
