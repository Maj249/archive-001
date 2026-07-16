import { useEffect, useRef } from "react";

import "./Cursor.css";

const interactiveSelector =
  "button, a, input, textarea, select, [data-cursor], [role='button']";

export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return undefined;
    }

    let visible = false;

    function setMode(target) {
      const interactive = target.closest?.(interactiveSelector);
      const cursorIntent = interactive?.dataset?.cursor?.toLowerCase() || "";
      const isDanger = /close|delete|remove|exit|trash/.test(cursorIntent);
      const isTextField = target.matches?.("input, textarea") || false;

      cursor.classList.toggle("custom-cursor--interactive", Boolean(interactive));
      cursor.classList.toggle("custom-cursor--danger", isDanger);
      cursor.classList.toggle("custom-cursor--text", isTextField);
    }

    function handlePointerMove(event) {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

      if (!visible) {
        visible = true;
        cursor.classList.add("custom-cursor--visible");
      }

      setMode(event.target);
    }

    function handlePointerDown() {
      cursor.classList.add("custom-cursor--down");
    }

    function handlePointerUp() {
      cursor.classList.remove("custom-cursor--down");
    }

    function handlePointerLeave() {
      visible = false;
      cursor.classList.remove("custom-cursor--visible");
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });
    window.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef} aria-hidden="true">
      <svg className="custom-cursor__arrow" viewBox="0 0 24 30">
        <path
          className="custom-cursor__fill"
          d="M2 2V25L7.5 19.4L11.2 28L15 26.3L11.2 18H19.5L2 2Z"
        />
        <path
          className="custom-cursor__stroke"
          d="M2 2V25L7.5 19.4L11.2 28L15 26.3L11.2 18H19.5L2 2Z"
        />
      </svg>

      <span className="custom-cursor__signal" />
    </div>
  );
}

