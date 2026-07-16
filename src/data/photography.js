const base = import.meta.env.BASE_URL;

function asset(path) {
  return `${base}${path.replace(/^\/+/, "")}`;
}

const originalNames = [
  "100_0132.JPG",
  "100_0165.JPG",
  "100_2098.jpg",
  "100_2870.JPG",
  "FullSizeRender.HEIC",
  "IMG_0594.JPG",
  "IMG_1248.jpg",
  "IMG_1684.JPG",
  "IMG_1707.HEIC",
  "IMG_1713.HEIC",
  "IMG_2788.jpg",
  "IMG_3208 2.PNG",
  "IMG_3705.HEIC",
  "IMG_4216.HEIC",
  "IMG_5715.jpg",
  "IMG_5742.heic",
  "IMG_6217.heic",
  "IMG_6234.HEIC",
  "IMG_6261.HEIC",
  "IMG_6262.HEIC",
  "IMG_6321.HEIC",
  "IMG_9806.HEIC",
  "P2130267-2.JPG",
  "b7b85d07-d2b1-4b14-9b17-016cd2743783.JPG",
];

const photography = originalNames.map((originalName, index) => {
  const number = String(index + 1).padStart(2, "0");

  return {
    id: number,
    originalName,
    thumbnail: asset(`photography/thumbs/photo-${number}.jpg`),
    src: asset(`photography/full/photo-${number}.jpg`),
    alt: `Jack Magi photography archive image ${number}`,
  };
});

export default photography;
