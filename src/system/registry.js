import Archive from "../apps/Archive";
import Contact from "../apps/Contact";
import Music from "../apps/Music";
import Photography from "../apps/Photography";
import Placeholder from "../apps/Placeholder";
import Resume from "../apps/Resume";
import Sketchbooks from "../apps/Sketchbooks";
import Terminal from "../apps/Terminal";

const registry = {
  archive: {
    id: "archive",
    title: "ARCHIVE_001",
    component: Archive,
    loader: true,
  },

  sketchbooks: {
    id: "sketchbooks",
    title: "SKETCHBOOKS",
    component: Sketchbooks,
    loader: true,
  },

  photography: {
    id: "photography",
    title: "PHOTOGRAPHY",
    component: Photography,
    loader: true,
  },

  music: {
    id: "music",
    title: "MUSIC.EXE",
    component: Music,
    loader: true,
  },

  resume: {
    id: "resume",
    title: "RESUME.PDF",
    component: Resume,
    loader: true,
  },

  contact: {
    id: "contact",
    title: "CONTACT.EXE",
    component: Contact,
    loader: true,
  },

  bin: {
    id: "bin",
    title: "RECYCLE BIN",
    component: Placeholder,
    loader: true,
    props: { id: "bin" },
  },

  terminal: {
    id: "terminal",
    title: "TERMINAL.EXE",
    component: Terminal,
    loader: true,
  },
};

export default registry;

export function getApp(id) {
  return registry[id];
}

export function getApps() {
  return Object.values(registry);
}
