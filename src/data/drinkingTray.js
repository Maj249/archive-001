const drinkingTray = {
  id: 3,
  slug: "drinking-tray",
  title: "DRINKING TRAY",
  category: "INDUSTRIAL DESIGN / FURNITURE",
  year: "2025",
  clearance: "03",
  status: "COMPLETED PROTOTYPE",
  summary:
    "A drinking tray set to host multiple items.",

  description:
    "The brief here was to make a drinking set. I said, imma make something sexy, how about that? This led me down a route that made life way harder for myself than it had to be, but hey, shit's dope. I ended up going down a rabbit hole of parametric louvres and how I could incorporate them into my piece. Turns out the tray needed a handle, how about that! I then incorporated the louvres to function as handles, and to be fucking sexy. This was designed for my mum, and she loves it—uses it as a display piece AYYY.",

  notes:
    "During the process here, it's worth noting I had to make a spoon, spoon rest, cup and biscuit dish. They were all templates provided to use, so not worth elaborating on really. The challenge here was that I couldn't route, so I had to spend a year (not actually) on the bobbin sander carving these pieces out. I love this piece; I dedicated weeks to the tray alone. It shows (I hope).",

  role: "EVERYTHING",
  duration: "6 WEEKS",

  tools: [
    "FUSION 360",
    "KEYSHOT",
    "BLENDER",
    "LASER CUTTING",
    "BOBBIN SANDER",
    "HAND FINISHING",
  ],

  cover: "projects/drinking-tray/cover.jpg",

  images: [
    "projects/drinking-tray/final-01.jpg",
    "projects/drinking-tray/sketch-01.jpg",
    "projects/drinking-tray/sketch-02.jpg",
    "projects/drinking-tray/sketch-03.jpg",
    "projects/drinking-tray/process-01.jpg",
    "projects/drinking-tray/process-02.jpg",
    "projects/drinking-tray/process-03.jpg",
    "projects/drinking-tray/process-04.jpg",
    "projects/drinking-tray/process-05.jpg",
    "projects/drinking-tray/process-06.jpg",
    "projects/drinking-tray/process-07.jpg",
  ],

  videos: [],

  model: "models/drinking-tray.stl",
  modelFit: 1.72,
  modelRotation: [0, 0, 0],

  process: [
    {
      stage: "RESEARCH",
      description:
        "Lots of research into parametric forms and how they're used around the world.",
    },
    {
      stage: "IDEATION",
      description:
        "Prototyped with cardboard, then used Corflute to laser cut an exact replica of my tray.",
    },
    {
      stage: "SKETCH DEVELOPMENT",
      description:
        "Sketched different trays, spoons, etc.",
    },
    {
      stage: "CAD / MODELLING",
      description:
        "Did all the CAD work in Fusion 360 using lofts, sweeps, etc. to achieve the parametric handles.",
    },
    {
      stage: "PROTOTYPING",
      description:
        "Prototyped with laser-cut Corflute and cardboard.",
    },
    {
      stage: "TESTING",
      description:
        "The Corflute prototype was an exact replica, so I tested the handles, found they needed more depth, and adjusted them.",
    },
    {
      stage: "REFINEMENT",
      description:
        "Lots of sanding once it was all put together, getting into the weird grooves and all.",
    },
    {
      stage: "FINAL OUTCOME",
      description:
        "A complete drinking set and beautiful tray.",
    },
  ],

  specifications: [
    ["PROJECT TYPE", "DRINKING SET / SERVING TRAY"],
    ["ROLE", "EVERYTHING"],
    ["DURATION", "6 WEEKS"],
    ["FINAL MATERIAL", "UNIDENTIFIED HARDWOOD"],
    ["PROTOTYPE MATERIALS", "CARDBOARD / CORFLUTE"],
    ["CAD METHODS", "LOFTS / SWEEPS / PARAMETRIC REPEATS"],
    ["PROTOTYPING", "FULL-SCALE LASER-CUT MODEL"],
    ["FABRICATION", "BOBBIN SANDING / HAND SHAPING"],
    ["STATUS", "COMPLETED PROTOTYPE"],
  ],
};

export default drinkingTray;
