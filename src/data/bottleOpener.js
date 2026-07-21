const bottleOpener = {
  id: 9,
  slug: "bottle-opener",
  title: "BOTTLE OPENER",
  category: "INDUSTRIAL DESIGN / PRODUCT DESIGN / METALWORK",
  year: "2026",
  clearance: "03",
  status: "COMPLETED PROTOTYPE",
  summary:
    "A compact sheet-metal bottle opener shaped around flow, balance and one continuous form.",

  description:
    "The brief here was pretty simple: make a bottle opener. I wanted to avoid making another boring rectangle with a hole in it, so I went down a route based around flow, balance and one continuous shape. After a stupid amount of sketching and prototype forms, I landed on this circular design with the opening tool cut into the centre. It was tested through laser-cut prototypes, cut from sheet metal, bent into shape and hand-finished. Small object, way more work than it looks, but it came out clean.",

  notes:
    "The biggest part of this project was getting the profile to actually open a bottle while still looking like one clean object. The early laser-cut iterations let me test the grip and opening geometry before committing to metal. The final bend lifts the edge and makes it easier to get under the cap. Simple, compact and honestly way better looking than a standard bottle opener.",

  role: "EVERYTHING",
  duration: "MULTI-WEEK PROTOTYPE DEVELOPMENT",

  tools: [
    "FUSION 360",
    "BLENDER",
    "LASER CUTTING",
    "WATERJET CUTTING",
    "SHEET-METAL BENDING",
    "HAND FINISHING",
  ],

  cover: "projects/bottle-opener/cover.jpg",

  images: [
    "projects/bottle-opener/render-02.jpg",
    "projects/bottle-opener/final-01.jpg",
    "projects/bottle-opener/final-02.jpg",
    "projects/bottle-opener/final-in-use.jpg",
    "projects/bottle-opener/concept-render.jpg",
    "projects/bottle-opener/sketch-01.jpg",
    "projects/bottle-opener/sketch-02.jpg",
    "projects/bottle-opener/technical-drawing.jpg",
    "projects/bottle-opener/process-01-laser.jpg",
    "projects/bottle-opener/process-02-prototypes.jpg",
    "projects/bottle-opener/process-03-blank.jpg",
    "projects/bottle-opener/process-04-bending.jpg",
    "projects/bottle-opener/process-05-forming.jpg",
    "projects/bottle-opener/process-06-machine.jpg",
  ],

  videos: [],

  model: "models/bottle-opener.obj",
  modelFit: 1.62,
  modelRotation: [0, 0, 0],

  process: [
    {
      stage: "RESEARCH",
      description:
        "Started with flow and balance as the visual direction, looking for a form that felt deliberate before it even explained what it did.",
    },
    {
      stage: "SKETCH DEVELOPMENT",
      description:
        "Pushed through a heap of profiles, loops and grip ideas to find something that could read as one continuous object instead of a standard opener.",
    },
    {
      stage: "CAD / MODELLING",
      description:
        "Built the strongest ideas in Fusion 360, worked out the opening geometry and produced drawings and cutting files for prototyping.",
    },
    {
      stage: "LASER-CUT PROTOTYPES",
      description:
        "Cut multiple full-size prototypes to compare the grip, cap contact and overall silhouette before touching the final sheet metal.",
    },
    {
      stage: "METAL FABRICATION",
      description:
        "Waterjet cut the final blank, then used sheet-metal equipment to introduce the raised bend that gives the opener clearance and leverage.",
    },
    {
      stage: "TESTING / REFINEMENT",
      description:
        "Tested the opening action, refined the contact points and hand-finished the edges until it felt comfortable and worked cleanly.",
    },
    {
      stage: "FINAL OUTCOME",
      description:
        "A small, functional object that keeps the opening mechanism inside one compact, balanced form.",
    },
  ],

  specifications: [
    ["PROJECT TYPE", "BOTTLE OPENER / HAND TOOL"],
    ["ROLE", "EVERYTHING"],
    ["OVERALL WIDTH", "74.5 MM"],
    ["BODY WIDTH", "52.1 MM"],
    ["MATERIAL THICKNESS", "3.91 MM"],
    ["PROTOTYPING", "LASER-CUT ITERATIONS"],
    ["FINAL CUTTING", "WATERJET"],
    ["FORMING", "SHEET-METAL BENDING"],
    ["FINISHING", "HAND-FINISHED EDGES"],
    ["STATUS", "COMPLETED PROTOTYPE"],
  ],
};

export default bottleOpener;
