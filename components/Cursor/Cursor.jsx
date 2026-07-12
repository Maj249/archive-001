import { useEffect, useState } from "react";
import "./Cursor.css";

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [mode, setMode] = useState("default");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);

      const interactive = event.target.closest("button, a, [data-cursor]");
      setMode(interactive?.dataset?.cursor || (interactive ? "view" : "default"));
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <div
      className={`cursor cursor--${mode} ${visible ? "cursor--visible" : ""}`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <svg viewBox="0 0 30 36" aria-hidden="true">
        <path
          d="M2 2L27 20H15L11 33L6 31L10 19H2V2Z"
          fill="white"
          stroke="black"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span>{mode === "default" ? "" : mode.toUpperCase()}</span>
    </div>
  );
}
