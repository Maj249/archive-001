const desktopItems = [
  {
    id: "archive",
    title: "ARCHIVE_001",
    label: "ARCHIVE_001",
    accent: "green",
    path: "/MAGI/ARCHIVE",
    description: "COMPLETE PROJECT DATABASE",
    fileType: "DIRECTORY",
  },
  {
    id: "sketchbooks",
    title: "SKETCHBOOKS",
    label: "SKETCHBOOKS",
    accent: "white",
    path: "/MAGI/SKETCHBOOKS",
    description: "DRAWINGS AND DEVELOPMENT",
    fileType: "DIRECTORY",
  },
  {
    id: "photography",
    title: "PHOTOGRAPHY",
    label: "PHOTOGRAPHY",
    accent: "purple",
    path: "/MAGI/PHOTOGRAPHY",
    description: "DOCUMENTATION AND FIELD IMAGES",
    fileType: "DIRECTORY",
  },
  {
    id: "music",
    title: "MUSIC.EXE",
    label: "MUSIC.EXE",
    accent: "green",
    path: "/MAGI/AUDIO/MUSIC.EXE",
    description: "SPOTIFY / PERSONAL AUDIO",
    fileType: "APPLICATION",
  },
  {
    id: "resume",
    title: "RESUME.PDF",
    label: "RESUME.PDF",
    accent: "purple",
    path: "/MAGI/DOCUMENTS/RESUME.PDF",
    description: "EMPLOYMENT AND EXPERIENCE FILE",
    fileType: "DOCUMENT",
  },
  {
    id: "contact",
    title: "CONTACT.EXE",
    label: "CONTACT.EXE",
    accent: "green",
    path: "/MAGI/SYSTEM/CONTACT.EXE",
    description: "COMMUNICATION TERMINAL",
    fileType: "APPLICATION",
  },
  {
    id: "bin",
    title: "RECYCLE BIN",
    label: "RECYCLE BIN",
    accent: "white",
    path: "/MAGI/SYSTEM/RECYCLE_BIN",
    description: "DISCARDED AND UNFINISHED IDEAS",
    fileType: "SYSTEM",
  },
  {
    id: "terminal",
    title: "TERMINAL.EXE",
    label: "TERMINAL.EXE",
    accent: "green",
    path: "/MAGI/SYSTEM/TERMINAL.EXE",
    description: "COMMAND INTERFACE",
    fileType: "APPLICATION",
  },
];

export function getDesktopItem(id) {
  return desktopItems.find((item) => item.id === id);
}

export function desktopItemExists(id) {
  return desktopItems.some((item) => item.id === id);
}

export default desktopItems;
