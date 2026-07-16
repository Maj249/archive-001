import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";

import App from "./App.jsx";

import "./styles/global.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error(
    'Unable to start MAGI WORK_OS: element with id="root" was not found.'
  );
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>
);