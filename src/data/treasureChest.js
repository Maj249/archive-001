const treasureChest = {
  id: 6,
  slug: "treasure-chest",
  title: "TREASURE CHEST",
  category: "OBJECT DESIGN / PROTOTYPING / FABRICATION",
  year: "2026",
  clearance: "04",
  status: "COMPLETED PROTOTYPE",
  summary:
    "A compact treasure chest combining a patterned timber lid, printed body and custom internal insert.",

  description:
    "For me, this project was great. The idea was to make a treasure chest that felt a bit more considered than a standard box, so I built it around a patterned timber lid, a 3D-printed body, custom feet, a metal aligner and a vacuum-formed insert. The preparation stage was probably the easiest part: I modelled the chest body, top lid and aligner, then sent the parts off for CNC cutting and 3D printing. From there it became a proper mixed-process build with sanding, waxing, spraying, nutserts, magnets and a heap of assembly work.",

  notes:
    "The CNC-cut lid went fantastically. There was a bit of threading, so I had to do some sanding, but it ultimately came out well. The printed chest body had a lot more issues. I experienced threading on the bottom and the temperatures were not set correctly, which caused layering issues along the sides. That was unfortunate because the piece was compromised and it was out of my control. Moving into production, the nutsert installation, spraying and sanding all went smoothly. I did make a mistake drilling the magnet holes into the timber and splintered the wood, which hurt the appearance of the piece. Other than that, the production process was smooth and overall I am happy with how it turned out.",

  role: "EVERYTHING",
  duration: "7 WEEKS",

  tools: [
    "FUSION 360",
    "BLENDER",
    "CNC MILLING",
    "3D PRINTING",
    "VACUUM FORMING",
    "SPRAY FINISHING",
    "HAND FINISHING",
  ],

  cover: "projects/treasure-chest/cover.jpg",

  images: [
    "projects/treasure-chest/final-composite.jpg",
    "projects/treasure-chest/timber-top.jpg",
    "projects/treasure-chest/exploded-render.jpg",
    "projects/treasure-chest/exploded-sketch.jpg",
    "projects/treasure-chest/technical-exploded.jpg",
    "projects/treasure-chest/moodboard.jpg",
    "projects/treasure-chest/thumbnail-sketches.jpg",
    "projects/treasure-chest/process-01-print.jpg",
    "projects/treasure-chest/process-02-cad.jpg",
    "projects/treasure-chest/process-03-nutsert.jpg",
    "projects/treasure-chest/process-04-timber.jpg",
    "projects/treasure-chest/process-05-paint.jpg",
    "projects/treasure-chest/process-06-insert.jpg",
    "projects/treasure-chest/process-07-assembly.jpg",
    "projects/treasure-chest/process-08-lid.jpg",
  ],

  videos: [],

  model: "models/treasure-chest.obj",
  modelFit: 1.55,
  modelRotation: [0, 0, 0],

  process: [
    {
      stage: "RESEARCH / MOODBOARD",
      description:
        "Looked at treasure chests, patterned timber surfaces, compartments and the kind of details that could make a small box feel like a proper object.",
    },
    {
      stage: "SKETCH DEVELOPMENT",
      description:
        "Worked through thumbnail ideas and an exploded sketch to figure out how the lid, body, insert, aligner, feet, magnets and hardware would all come together.",
    },
    {
      stage: "CAD / PLANNING",
      description:
        "Modelled the chest body, timber top, aligner and feet, then prepared the lid for CNC cutting and the polymer parts for 3D printing.",
    },
    {
      stage: "OUTSOURCED PRODUCTION",
      description:
        "Sent the timber lid to the CNC mill and the chest body and aligner to the printing bureau. The lid came out well, while the body arrived with threading and layer problems caused by the print settings.",
    },
    {
      stage: "SURFACE FINISHING",
      description:
        "Sanded and waxed the patterned timber, then primed, sanded and sprayed the chest body to bring the different processes into one finished object.",
    },
    {
      stage: "INSERT / HARDWARE",
      description:
        "Vacuum formed the internal insert and installed the nutserts, screws and magnets. The magnet holes splintered the timber more than I wanted, but the system still came together.",
    },
    {
      stage: "FINAL ASSEMBLY",
      description:
        "Aligned the lid, body, insert and feet, then completed the final assembly and presentation photography.",
    },
  ],

  specifications: [
    ["PROJECT TYPE", "TREASURE CHEST / OBJECT DESIGN"],
    ["ROLE", "EVERYTHING"],
    ["DURATION", "7 WEEKS"],
    ["TIMBER TOP", "VICTORIAN ASH / WALNUT PATTERN"],
    ["CHEST BODY", "3D-PRINTED POLYMER"],
    ["INTERNAL INSERT", "VACUUM-FORMED PETG"],
    ["HARDWARE", "NUTSERTS / M3 SCREWS / MAGNETS"],
    ["PRIMARY PROCESSES", "CNC / 3D PRINTING / VACUUM FORMING"],
    ["FINISHING", "SANDING / WAXING / PRIMING / SPRAY PAINTING"],
    ["STATUS", "COMPLETED PROTOTYPE"],
  ],
};

export default treasureChest;
