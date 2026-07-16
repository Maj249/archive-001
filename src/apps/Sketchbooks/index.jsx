import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaXmark,
} from "react-icons/fa6";

import sketches from "../../data/sketches";

import "./Sketchbooks.css";

export default function Sketchbooks() {
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
    if (activeIndex === null || sketches.length < 2) return;

    const nextIndex =
      activeIndex === sketches.length - 1 ? 0 : activeIndex + 1;
    const previousIndex =
      activeIndex === 0 ? sketches.length - 1 : activeIndex - 1;

    [sketches[nextIndex], sketches[previousIndex]].forEach((page) => {
      const preload = new Image();
      preload.src = page.src;
    });
  }, [activeIndex]);

  function showPrevious() {
    setActiveIndex((current) => {
      if (current === null || current === 0) {
        return sketches.length - 1;
      }

      return current - 1;
    });
  }

  function showNext() {
    setActiveIndex((current) => {
      if (current === null || current === sketches.length - 1) {
        return 0;
      }

      return current + 1;
    });
  }

  const lightbox =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {activeIndex !== null && sketches[activeIndex] && (
              <SketchbookLightbox
                key="sketchbook-lightbox"
                page={sketches[activeIndex]}
                activeIndex={activeIndex}
                total={sketches.length}
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
    <section className="photography-app photography-app--sketchbooks">
      <header className="photography-app__header">
        <div>
          <p>MAGI DRIVE / SCANNED SKETCH DIRECTORY</p>
          <h2>SKETCHBOOKS</h2>
        </div>

        <div className="photography-app__count">
          <strong>{String(sketches.length).padStart(2, "0")}</strong>
          <span>PAGES ONLINE</span>
        </div>
      </header>

      <div className="photography-app__status">
        <span>/MAGI/SKETCHBOOKS</span>
        <i />
        <strong>CLICK A PAGE TO EXPAND</strong>
      </div>

      <div className="photography-app__gallery">
        {sketches.map((page, index) => (
          <motion.button
            className="photography-card"
            type="button"
            key={page.id}
            onClick={() => setActiveIndex(index)}
            data-cursor="VIEW FULL SKETCH"
            aria-label={`Open sketchbook page ${index + 1}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: Math.min(index * 0.02, 0.36),
              duration: 0.36,
            }}
            whileTap={{ scale: 0.99 }}
          >
            <img
              src={page.thumbnail}
              alt={page.alt}
              loading="lazy"
              decoding="async"
            />

            <span>PAGE_{page.id}</span>
          </motion.button>
        ))}
      </div>

      {lightbox}
    </section>
  );
}

function SketchbookLightbox({
  page,
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
      aria-label={`Sketchbook page ${activeIndex + 1} of ${total}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="photography-lightbox__scanlines" aria-hidden="true" />

      <header className="photography-lightbox__header">
        <div>
          <span>MAGI SKETCH VIEWER</span>
          <strong>SKETCHBOOKS</strong>
        </div>

        <p>PAGE {number} / {count}</p>

        <button
          type="button"
          onClick={onClose}
          data-cursor="CLOSE SKETCH"
          aria-label="Close sketchbook page"
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
          data-cursor="PREVIOUS SKETCH"
          aria-label="Previous sketchbook page"
        >
          <FaArrowLeft />
        </button>

        <div className="photography-lightbox__image-frame">
          <AnimatePresence mode="wait">
            <motion.img
              key={page.src}
              src={page.src}
              alt={page.alt}
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
          data-cursor="NEXT SKETCH"
          aria-label="Next sketchbook page"
        >
          <FaArrowRight />
        </button>
      </div>

      <footer className="photography-lightbox__footer">
        <span>FULL SKETCH VIEW</span>
        <strong>← → NAVIGATE / ESC CLOSE</strong>
        <span>PAGE_{number}</span>
      </footer>
    </motion.section>
  );
}
