const germaprobe = {
  id: 1,
  slug: "germaprobe",
  title: "GERMAPROBE",
  category: "INDUSTRIAL DESIGN / EXPERIMENT",
  year: "2026",
  clearance: "02",
  status: "COMPLETED",
  summary: "The ultimate microbe-seeking missile.",

  description:
    "This was created for a uni assignment where I was tasked with creating a hand tool. Through talking to the people I love, I found that people hate germs; they are germaphobes, per se. Hence the creation of the GERMAPROBE! The Germaprobe was designed with a fun, creative intent, looking more like a keychain accessory so people don't look at you funny for hating germs. It's an eye-catcher, it's sexy, it's the Germaprobe.",

  notes:
    "Making the Germaprobe, I decided 3D printing would be the best/most precise outcome. I would love to have taken it to get silver cast, giving it a lil bit of heft, but I'm a tight ass. In saying that, I would love to refine this project into a more polished version. The hook broke, so I had to compromise by drilling a hole (honestly worked way better).",

  role: "INVENTED AND DESIGNED BY MAGI",
  duration: "2 WEEKS",

  tools: [
    "FUSION 360",
    "BLENDER",
    "BAMBU STUDIO",
    "ADOBE INDESIGN",
    "CAPCUT",
    "3D PRINTING",
  ],

  cover: "projects/germaprobe/cover.jpg",

  images: [
    "projects/germaprobe/final-01.jpg",
    "projects/germaprobe/final-02.jpg",
    "projects/germaprobe/process-01.jpg",
    "projects/germaprobe/process-02.jpg",
    "projects/germaprobe/process-03.jpg",
    "projects/germaprobe/process-04.jpg",
  ],

  videos: [
    {
      src: "projects/germaprobe/video-01.mp4",
      title: "GERMAPROBE FIELD TEST",
      poster: "projects/germaprobe/cover.jpg",
      type: "video/mp4",
    },
  ],

  model: "models/ship3june.stl",
  modelFit: 1.5,
  modelRotation: [0, 0, Math.PI],

  process: [
    {
      stage: "RESEARCH",
      description:
        "Researching inspo, existing products and moodboarding.",
    },
    {
      stage: "IDEATION",
      description:
        "Playing around with different 3D models to see what would work, plus hook exploration.",
    },
    {
      stage: "CAD / MODELLING",
      description:
        "Designed in Fusion 360, then printed through Bambu Labs and rendered in Blender.",
    },
    {
      stage: "PROTOTYPING",
      description:
        "Started with GERMAPROBE V1 for feel testing, then moved to the final product (time crunch).",
    },
    {
      stage: "TESTING",
      description:
        "Went out into the environments to see how well it interacted with its environment (swimmingly).",
    },
    {
      stage: "REFINEMENT",
      description:
        "Gave it a sand, prime and chrome finish before attaching it to the keychain.",
    },
    {
      stage: "FINAL OUTCOME",
      description:
        "GERMAPROBE.",
    },
  ],

  specifications: [
    ["PROJECT TYPE", "UNIVERSITY HAND-TOOL BRIEF"],
    ["ROLE", "INVENTED AND DESIGNED BY MAGI"],
    ["DURATION", "2 WEEKS"],
    ["MATERIAL", "PLA BASIC"],
    ["FINISH", "SANDED / PRIMED / CHROME SPRAY"],
    ["MANUFACTURING", "BAMBU LAB X1E 3D PRINTING"],
    ["ATTACHMENT", "RETRACTABLE KEYCHAIN"],
    ["SOFTWARE", "FUSION 360 / BLENDER / BAMBU STUDIO"],
    ["STATUS", "FINAL PROTOTYPE"],
  ],
};

export default germaprobe;
