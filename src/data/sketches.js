const base = import.meta.env.BASE_URL;

function asset(path) {
  return `${base}${path.replace(/^\/+/, "")}`;
}

const sketches = Array.from({ length: 32 }, (_, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    id: number,
    thumbnail: asset(`sketches/thumbs/page-${number}.jpg`),
    src: asset(`sketches/full/page-${number}.jpg`),
    alt: `Jack Magi sketchbook page ${number}`,
  };
});

export default sketches;
