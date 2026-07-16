import { useEffect, useRef, useState } from "react";

import { projects } from "../../data/projects";
import { closeApp, openApp } from "../../system/windowManager";
import { openProject } from "../../system/projectManager";
import SnakeGame from "./SnakeGame";

import "./Terminal.css";

const INTRO_LINES = [
  { type: "system", text: "MAGI COMMAND TERMINAL v0.3.0" },
  { type: "muted", text: "SECURE CONNECTION ESTABLISHED / TYPE HELP" },
];

const APP_ALIASES = {
  archive: "archive",
  sketches: "sketchbooks",
  sketchbooks: "sketchbooks",
  photography: "photography",
  photos: "photography",
  music: "music",
  spotify: "music",
  resume: "resume",
  contact: "contact",
  bin: "bin",
  terminal: "terminal",
};

function createOutput(text, type = "output") {
  return {
    id: `${Date.now()}-${Math.random()}`,
    type,
    text,
  };
}

export default function Terminal() {
  const [history, setHistory] = useState(INTRO_LINES);
  const [command, setCommand] = useState("");
  const [mode, setMode] = useState("terminal");
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const terminal = scrollRef.current;
    if (terminal) terminal.scrollTop = terminal.scrollHeight;
  }, [history]);

  function addLines(lines) {
    const nextLines = Array.isArray(lines) ? lines : [lines];
    setHistory((current) => [...current, ...nextLines]);
  }

  function openApplication(name) {
    const appId = APP_ALIASES[name];

    if (!appId) {
      addLines(createOutput(`APPLICATION NOT FOUND: ${name || "UNKNOWN"}`, "error"));
      return;
    }

    addLines(createOutput(`OPENING /MAGI/APPS/${appId.toUpperCase()}...`, "success"));
    window.setTimeout(() => openApp(appId), 180);
  }

  function openProjectFile(searchTerm) {
    if (!searchTerm) {
      addLines(createOutput("USAGE: PROJECT <NAME OR NUMBER>", "error"));
      return;
    }

    const cleanedSearch = searchTerm.toLowerCase().replace(/[^a-z0-9]/g, "");
    const project = projects.find((item) => {
      const candidates = [item.id, item.slug, item.title]
        .filter((value) => value !== undefined && value !== null)
        .map((value) => String(value).toLowerCase().replace(/[^a-z0-9]/g, ""));

      return candidates.some(
        (candidate) =>
          candidate === cleanedSearch || candidate.includes(cleanedSearch)
      );
    });

    if (!project) {
      addLines(createOutput(`PROJECT NOT FOUND: ${searchTerm}`, "error"));
      return;
    }

    closeApp();
    window.setTimeout(() => openProject(project), 130);
  }

  function executeCommand(rawCommand) {
    const trimmed = rawCommand.trim();
    const normalized = trimmed.toLowerCase().replace(/\s+/g, " ");
    const [baseCommand, ...argumentsList] = normalized.split(" ");
    const argument = argumentsList.join(" ");

    if (!trimmed) return;

    addLines(createOutput(`jack@magi-os:~$ ${trimmed}`, "command"));

    if (normalized === "deez nutz" || normalized === "deez nuts") {
      addLines(createOutput("UNLOCK CODE ACCEPTED. LOADING DEEZ_NUTZ.SNK...", "success"));
      window.setTimeout(() => setMode("snake"), 260);
      return;
    }

    switch (baseCommand) {
      case "help":
        addLines([
          createOutput("AVAILABLE COMMANDS", "heading"),
          createOutput("HELP                 SHOW THIS COMMAND LIST", "muted"),
          createOutput("ABOUT                DISPLAY CREATOR PROFILE", "muted"),
          createOutput("PROJECTS             LIST ARCHIVE PROJECTS", "muted"),
          createOutput("PROJECT <NAME>       OPEN A PROJECT DOSSIER", "muted"),
          createOutput("OPEN <APP>           OPEN A MAGI OS APP", "muted"),
          createOutput("MUSIC / RESUME       OPEN DIRECTLY", "muted"),
          createOutput("CONTACT              OPEN CONTACT TERMINAL", "muted"),
          createOutput("DATE / WHOAMI / PWD  SYSTEM INFORMATION", "muted"),
          createOutput("CLEAR                CLEAR TERMINAL", "muted"),
          createOutput("EXIT                 CLOSE TERMINAL", "muted"),
          createOutput("HIDDEN COMMANDS MAY EXIST.", "success"),
        ]);
        break;

      case "about":
        addLines([
          createOutput("JACK MAGI / MELBOURNE, AUSTRALIA", "heading"),
          createOutput("INDUSTRIAL DESIGNER / MAKER / CREATIVE", "output"),
          createOutput("STATUS: AVAILABLE FOR FREELANCE DESIGN WORK", "success"),
        ]);
        break;

      case "projects":
      case "ls":
        addLines([
          createOutput(`ARCHIVE INDEX / ${projects.length} FILES`, "heading"),
          ...projects.map((project, index) =>
            createOutput(
              `${String(index + 1).padStart(2, "0")}  ${project.title}  /  ${project.year ?? "UNKNOWN"}`,
              "muted"
            )
          ),
          createOutput("TYPE PROJECT <NAME> TO OPEN A FILE", "success"),
        ]);
        break;

      case "project":
        openProjectFile(argument);
        break;

      case "open":
        openApplication(argument);
        break;

      case "music":
      case "spotify":
        openApplication("music");
        break;

      case "resume":
        openApplication("resume");
        break;

      case "contact":
        openApplication("contact");
        break;

      case "date":
        addLines(createOutput(new Date().toString().toUpperCase()));
        break;

      case "whoami":
        addLines(createOutput("JACK MAGI / AUTHORISED MAGI OS USER", "success"));
        break;

      case "pwd":
        addLines(createOutput("/MAGI/USERS/JACK/WORK_OS"));
        break;

      case "sudo":
        addLines(createOutput("NICE TRY. ADMIN PRIVILEGES DENIED.", "error"));
        break;

      case "matrix":
        addLines(createOutput("WAKE UP, JACK... THE ARCHIVE HAS YOU.", "success"));
        break;

      case "clear":
        setHistory([]);
        break;

      case "exit":
      case "close":
        closeApp();
        break;

      default:
        addLines([
          createOutput(`COMMAND NOT FOUND: ${baseCommand.toUpperCase()}`, "error"),
          createOutput("TYPE HELP FOR AVAILABLE COMMANDS", "muted"),
        ]);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    executeCommand(command);
    setCommand("");
  }

  function exitSnake() {
    setMode("terminal");
    addLines(createOutput("DEEZ_NUTZ.SNK CLOSED / SCORE SAVED", "success"));
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  if (mode === "snake") {
    return <SnakeGame onExit={exitSnake} />;
  }

  return (
    <section className="terminal-app" onClick={() => inputRef.current?.focus()}>
      <header className="terminal-app__header">
        <div>
          <span>MAGI SYSTEMS / COMMAND INTERFACE</span>
          <strong>TERMINAL.EXE</strong>
        </div>

        <div className="terminal-app__status">
          <i />
          CONNECTION SECURE
        </div>
      </header>

      <div className="terminal-app__output" ref={scrollRef} aria-live="polite">
        {history.map((line) => (
          <p key={line.id ?? `${line.type}-${line.text}`} className={`terminal-line terminal-line--${line.type}`}>
            {line.text}
          </p>
        ))}

        <form className="terminal-app__prompt" onSubmit={handleSubmit}>
          <label htmlFor="magi-terminal-input">jack@magi-os:~$</label>
          <input
            id="magi-terminal-input"
            ref={inputRef}
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck="false"
            aria-label="Terminal command"
          />
          <span aria-hidden="true" />
        </form>
      </div>

      <footer className="terminal-app__footer">
        <span>TYPE HELP TO BEGIN</span>
        <span>INPUT CHANNEL 04</span>
        <span>MAGI_OS v0.3.0</span>
      </footer>
    </section>
  );
}
