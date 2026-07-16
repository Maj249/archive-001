const gameController = {
  id: 2,
  slug: "game-controller",
  title: "GAME CONTROLLER",
  category: "INDUSTRIAL DESIGN / PRODUCT CONCEPT",
  year: "2026",
  clearance: "03",
  status: "COMPLETED PROTOTYPE",
  summary:
    "An Xbox One-inspired controller taken from CAD model to 3D print.",

  description:
    "For this project I had to design a video game controller of my liking, and hey, if it ain't broke, don't fix it. Hence my choice of the Xbox One controller. This whole process was done in Fusion 360's freeform space. It all started with a freeform box, and from there I designed every factor of the controller (apart from the Arduino board). Took me so long, but it came out looking pretty dope.",

  notes:
    "The final outcome of this product was so messy due to poor 3D print settings and the fact that this product was designed for injection moulding, not 3D printing. However, digitally the controller presented super well and sexy. It was a challenge making the controller; however, once I got the hang of the freeform tools, it was super chill, and I was able to sculpt it however I liked. Definitely would not print on the Bambu Lab X1E again though.",

  role: "EVERYTHING",

  tools: [
    "FUSION 360",
    "FREEFORM MODELLING",
    "BAMBU STUDIO",
    "FDM 3D PRINTING",
    "CAD RENDERING",
  ],

  cover: "projects/game-controller/cover.jpg",

  images: [
    "projects/game-controller/front.jpg",
    "projects/game-controller/final-01.jpg",
    "projects/game-controller/final-02.jpg",
    "projects/game-controller/final-03.jpg",
    "projects/game-controller/process-01.jpg",
    "projects/game-controller/process-02.jpg",
    "projects/game-controller/process-03.jpg",
    "projects/game-controller/process-04.jpg",
    "projects/game-controller/process-05.jpg",
  ],

  videos: [],

  model: "projects/game-controller/model.obj",
  modelFit: 1.7,
  modelRotation: [0, 0, 0],

  process: [
    {
      stage: "RESEARCH",
      description:
        "Researched dimensions and existing designs to give myself the challenge of replicating a successful product.",
    },
    {
      stage: "IDEATION",
      description:
        "Not much ideation in this stage, but lots of planning.",
    },
    {
      stage: "CAD / MODELLING",
      description:
        "Third and biggest step. This took up the majority of the project; I spent hours on hours perfecting it.",
    },
    {
      stage: "PROTOTYPING",
      description:
        "Printed multiple controllers to test how the parts fit and how it fit in your hand.",
    },
    {
      stage: "TESTING",
      description:
        "Didn't function because it was a prototype, but it fit the user well.",
    },
    {
      stage: "FINAL OUTCOME",
      description:
        "The final outcome physically was a bit messy but achieved what it needed to. Digitally, I'm very happy with the renders, etc.",
    },
  ],

  specifications: [
    ["PROJECT TYPE", "CONTROLLER REPLICATION / PRODUCT CONCEPT"],
    ["ROLE", "EVERYTHING"],
    ["CAD METHOD", "FUSION 360 FREEFORM SURFACING"],
    ["MATERIAL", "PLA PROTOTYPE"],
    ["PROTOTYPE PROCESS", "FDM 3D PRINTING"],
    ["INTENDED PRODUCTION", "INJECTION MOULDING"],
    ["COLOUR / FINISH", "BLACK / WHITE"],
    ["ELECTRONICS", "ARDUINO BOARD / PROTOTYPE ONLY"],
    ["STATUS", "COMPLETED NON-FUNCTIONAL PROTOTYPE"],
  ],
};

export default gameController;
