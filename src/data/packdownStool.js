const packdownStool = {
  id: 5,
  slug: "packdown-stool",
  title: "PACKDOWN STOOL",
  category: "FURNITURE DESIGN / MECHANICAL CAD / FLAT PACK",
  year: "2026",
  clearance: "03",
  status: "RESOLVED CAD CONCEPT",
  summary:
    "A mechanically driven folding stool and bench built around a custom pin-slot joint.",

  description:
    "This project explores a mechanically driven folding chair and bench, moving from early concepts into a resolved CAD assembly, working drawings, renders and animated movement. The reason this became my chosen concept was the pin-slot joint. I was really proud of the design steps I took to construct it, as I hadn’t played around with joints much in the past. It posed a challenge to begin with, but I figured it out fairly quickly. Regardless, I love how it turned out. It somewhat reminds me of a cow.",

  notes:
    "Most of the work here was about making the movement believable, not just making a nice-looking render. The pin and slot needed to guide the legs into position, support the top and still allow the whole thing to pack down. Building it as an assembly forced me to think about how every component interacted, then prove the idea through orthographic, flat and exploded drawings.",

  role: "EVERYTHING",
  duration: "CAD DEVELOPMENT PROJECT",

  tools: [
    "FUSION 360",
    "PARAMETRIC CAD",
    "ASSEMBLY MODELLING",
    "TECHNICAL DRAWING",
    "RENDERING",
    "ANIMATION",
  ],

  cover: "projects/packdown-stool/cover.jpg",

  images: [
    "projects/packdown-stool/final-01.jpg",
    "projects/packdown-stool/final-top.jpg",
    "projects/packdown-stool/joint-detail.jpg",
    "projects/packdown-stool/folded-state.jpg",
    "projects/packdown-stool/concept-02.jpg",
    "projects/packdown-stool/concept-02-flat.jpg",
    "projects/packdown-stool/concept-03.jpg",
    "projects/packdown-stool/concept-03-flat.jpg",
    "projects/packdown-stool/moodboard.jpg",
    "projects/packdown-stool/design-01.jpg",
    "projects/packdown-stool/design-02.jpg",
    "projects/packdown-stool/design-03.jpg",
    "projects/packdown-stool/design-04.jpg",
    "projects/packdown-stool/design-05.jpg",
    "projects/packdown-stool/design-06.jpg",
    "projects/packdown-stool/technical-working.jpg",
    "projects/packdown-stool/technical-flat.jpg",
    "projects/packdown-stool/technical-exploded.jpg",
  ],

  videos: [],

  model: "models/packdown-stool.obj",
  modelFit: 1.58,
  modelRotation: [-1.5708, 0, 0],

  process: [
    {
      stage: "RESEARCH / MOODBOARD",
      description:
        "Looked at folding chairs, low benches, flat-pack furniture and different ways a joint could control movement without making the structure look too mechanical.",
    },
    {
      stage: "CONCEPT 01",
      description:
        "Started with a low folding bench that could collapse into a flatter object. This established the overall direction but the movement still needed a stronger joint idea.",
    },
    {
      stage: "CONCEPT 02",
      description:
        "Explored a curved shell-like stool that packed into a simple rounded form. It was clean, but it did not have the mechanical character I wanted from the project.",
    },
    {
      stage: "PIN-SLOT JOINT",
      description:
        "Developed the custom pin-slot joint and tested its movement inside the assembly. This became the reason the final chair and bench concept was selected.",
    },
    {
      stage: "CAD REFINEMENT",
      description:
        "Refined the top, legs, slots and clearances, then checked the object in its open, moving and packed-down states.",
    },
    {
      stage: "VISUALISATION",
      description:
        "Produced final renders from multiple angles, including the underside and joint detail, to clearly show how the form and mechanism work together.",
    },
    {
      stage: "TECHNICAL RESOLUTION",
      description:
        "Completed orthographic, flat and exploded drawings to document the assembly, component relationships and final design intent.",
    },
  ],

  specifications: [
    ["PROJECT TYPE", "FOLDING STOOL / LOW BENCH"],
    ["ROLE", "EVERYTHING"],
    ["PRIMARY MECHANISM", "CUSTOM PIN-SLOT JOINT"],
    ["COMPONENTS", "TOP SEAT / LEG 01 / LEG 02"],
    ["PROPOSED MATERIAL", "WALNUT"],
    ["CAD", "FUSION 360 PARAMETRIC ASSEMBLY"],
    ["DOCUMENTATION", "ORTHOGRAPHIC / FLAT / EXPLODED"],
    ["MOVEMENT", "OPEN / TRANSITION / PACKED DOWN"],
    ["STATUS", "RESOLVED CAD CONCEPT"],
  ],
};

export default packdownStool;
