export default function Placeholder({ id }) {
  const content = {
    sketchbooks: {
      title: "SKETCHBOOKS",
      heading: "DRAWING DATABASE",
      description: "SKETCHES / IDEAS / DEVELOPMENT",
    },

    objects: {
      title: "OBJECTS",
      heading: "OBJECT ARCHIVE",
      description: "PRODUCTS / MODELS / BUILDS",
    },

    experiments: {
      title: "EXPERIMENTS",
      heading: "RESEARCH DATABASE",
      description: "MATERIALS / TESTS / PROTOTYPES",
    },

    photography: {
      title: "PHOTOGRAPHY",
      heading: "IMAGE LIBRARY",
      description: "DOCUMENTATION / FIELD NOTES",
    },

    resume: {
      title: "RESUME.PDF",
      heading: "CAREER PROFILE",
      description: "EMPLOYMENT / EXPERIENCE",
    },

    contact: {
      title: "CONTACT.EXE",
      heading: "COMMUNICATION TERMINAL",
      description: "EMAIL / SOCIALS",
    },

    bin: {
      title: "RECYCLE BIN",
      heading: "EMPTY",
      description: "NO ITEMS FOUND",
    },
  };

  const page =
    content[id] || {
      title: "UNKNOWN",
      heading: "DIRECTORY NOT FOUND",
      description: "SYSTEM ERROR",
    };

  return (
    <div className="placeholder-window">

      <p>{page.title}</p>

      <h2>{page.heading}</h2>

      <span>{page.description}</span>

    </div>
  );
}