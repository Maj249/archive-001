const davinciAerialScrew = {
  id: 7,
  slug: "davinci-aerial-screw",
  title: "DAVINCI AERIAL SCREW",
  category: "INDUSTRIAL DESIGN / PRODUCT CONCEPT / EXPERIMENT",
  year: "2025",
  clearance: "05",
  status: "COMPLETED FUNCTIONING PROTOTYPE",
  summary: "A model of Da Vinci's Aerial Screw.",

  description:
    "This was my first big group project at uni. We were tasked with making Da Vinci's supposed 'flying' aerial screw. This thing would never fly; however, it was a pretty groovy and experimental design for its time, and inspired the helicopter, which is pretty dope. For this project I took the lead on the CAD, making all of it in Fusion 360 and rendering it in KeyShot. Came out pretty sexy—swag.",

  notes:
    "Honestly, the biggest challenge of this project was the sail. Making something that coiled up was fine, but adding a taper as it approached the top was tricky. Once I figured out how to do it, though, it was a walk in the park. If I did it again, I would definitely use different materials for the sail, but hey, it turned out pretty good. The CAD model was super solid, and we got a finished functioning prototype—flew and everything.",

  role: "CAD / 3D PRINTING",
  duration: "4 WEEKS",

  tools: [
    "FUSION 360",
    "BLENDER",
    "KEYSHOT",
    "3D PRINTING",
    "HAND FABRICATION",
  ],

  cover: "projects/davinci-aerial-screw/cover.jpg",

  images: [
    "projects/davinci-aerial-screw/final-01.jpg",
    "projects/davinci-aerial-screw/render-01.jpg",
    "projects/davinci-aerial-screw/render-02.jpg",
    "projects/davinci-aerial-screw/render-03.jpg",
    "projects/davinci-aerial-screw/exploded-view.jpg",
    "projects/davinci-aerial-screw/process-overview.jpg",
    "projects/davinci-aerial-screw/development-01.jpg",
    "projects/davinci-aerial-screw/development-02.jpg",
    "projects/davinci-aerial-screw/development-03.jpg",
    "projects/davinci-aerial-screw/render-board.jpg",
  ],

  videos: [],

  model: "models/davinci-aerial-screw.stl",
  modelFit: 1.48,
  modelRotation: [-Math.PI / 2, 0, 0],

  process: [
    {
      stage: "RESEARCH / BRIEF",
      description:
        "Our first big group project at uni was to reconstruct Da Vinci's experimental Aerial Screw and turn the historical idea into a working physical model.",
    },
    {
      stage: "CAD / MODELLING",
      description:
        "I took the lead on CAD in Fusion 360, building the base, central beam, supports and the full spiral sail assembly so every part could be fabricated and put together.",
    },
    {
      stage: "SAIL DEVELOPMENT",
      description:
        "The sail was the hardest part. Coiling the form was fine, but tapering it as it approached the top took a fair bit of problem-solving before the geometry finally behaved.",
    },
    {
      stage: "PROTOTYPE FABRICATION",
      description:
        "The model combined 3D-printed PLA parts with an MDF structure and a hand-shaped fabric sail. Bearings, wire and small connecting parts let the screw rotate around the central beam.",
    },
    {
      stage: "ASSEMBLY / TESTING",
      description:
        "The group assembled the frame, fitted the sail and refined the joins until the model held together cleanly and worked as a functioning prototype—flew and everything.",
    },
    {
      stage: "RENDERING / DOCUMENTATION",
      description:
        "I rendered the finished CAD in KeyShot and produced the exploded view and visual documentation to show how the full assembly worked.",
    },
    {
      stage: "FINAL OUTCOME",
      description:
        "A solid CAD model and a completed physical Aerial Screw prototype. The sail material could be improved, but the finished result turned out pretty good.",
    },
  ],

  specifications: [
    ["PROJECT TYPE", "GROUP UNIVERSITY PROJECT / HISTORICAL RECONSTRUCTION"],
    ["ROLE", "CAD LEAD / 3D PRINTING"],
    ["DURATION", "4 WEEKS"],
    ["PRIMARY SOFTWARE", "FUSION 360 / KEYSHOT / BLENDER"],
    ["MATERIALS", "MDF / PLA BASIC / FABRIC / STEEL WIRE"],
    ["MANUFACTURING", "3D PRINTING / HAND FABRICATION"],
    ["MECHANISM", "CENTRAL SHAFT / BEARINGS / ROTATING SAIL"],
    ["DOCUMENTATION", "RENDERS / EXPLODED VIEW / BUILD RECORD"],
    ["STATUS", "COMPLETED FUNCTIONING PROTOTYPE"],
  ],
};

export default davinciAerialScrew;
