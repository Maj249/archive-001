import "./PixelIcon.css";

const pixelShapes = {
  archive: (
    <>
      <rect x="5" y="9" width="22" height="16" rx="1" />
      <rect x="8" y="6" width="9" height="5" rx="1" />
      <rect x="9" y="14" width="14" height="2" className="pixel-icon__dark" />
      <rect x="11" y="18" width="10" height="4" className="pixel-icon__light" />
    </>
  ),
  sketchbooks: (
    <>
      <rect x="8" y="5" width="18" height="22" rx="1" />
      <rect x="5" y="6" width="4" height="20" className="pixel-icon__dark" />
      <rect x="11" y="9" width="11" height="2" className="pixel-icon__light" />
      <rect x="11" y="14" width="9" height="2" className="pixel-icon__light" />
      <rect x="11" y="19" width="7" height="2" className="pixel-icon__light" />
      <rect x="4" y="8" width="3" height="2" />
      <rect x="4" y="13" width="3" height="2" />
      <rect x="4" y="18" width="3" height="2" />
      <rect x="4" y="23" width="3" height="2" />
    </>
  ),
  objects: (
    <>
      <polygon points="16,4 27,10 16,16 5,10" />
      <polygon points="5,10 16,16 16,28 5,22" className="pixel-icon__dark" />
      <polygon points="27,10 16,16 16,28 27,22" className="pixel-icon__light" />
      <rect x="15" y="16" width="2" height="12" className="pixel-icon__edge" />
    </>
  ),
  experiments: (
    <>
      <rect x="13" y="4" width="6" height="7" />
      <rect x="11" y="10" width="10" height="3" className="pixel-icon__dark" />
      <polygon points="11,12 21,12 26,25 23,28 9,28 6,25" />
      <rect x="10" y="21" width="12" height="5" className="pixel-icon__light" />
      <rect x="13" y="17" width="3" height="3" className="pixel-icon__edge" />
      <rect x="18" y="19" width="2" height="2" className="pixel-icon__edge" />
    </>
  ),
  photography: (
    <>
      <rect x="5" y="10" width="22" height="16" rx="1" />
      <rect x="9" y="7" width="7" height="5" />
      <rect x="19" y="8" width="5" height="3" className="pixel-icon__dark" />
      <rect x="11" y="14" width="10" height="10" className="pixel-icon__dark" />
      <rect x="13" y="16" width="6" height="6" className="pixel-icon__light" />
      <rect x="23" y="13" width="2" height="2" className="pixel-icon__edge" />
    </>
  ),
  resume: (
    <>
      <rect x="6" y="5" width="20" height="22" rx="1" />
      <rect x="9" y="8" width="8" height="7" className="pixel-icon__dark" />
      <rect x="19" y="8" width="4" height="4" className="pixel-icon__light" />
      <rect x="10" y="18" width="12" height="2" className="pixel-icon__light" />
      <rect x="10" y="22" width="9" height="2" className="pixel-icon__light" />
      <rect x="20" y="24" width="3" height="3" className="pixel-icon__edge" />
    </>
  ),
  contact: (
    <>
      <rect x="4" y="6" width="24" height="17" rx="1" />
      <rect x="7" y="9" width="18" height="11" className="pixel-icon__dark" />
      <rect x="14" y="23" width="4" height="4" />
      <rect x="10" y="27" width="12" height="2" className="pixel-icon__light" />
      <rect x="9" y="12" width="3" height="2" className="pixel-icon__edge" />
      <rect x="13" y="14" width="7" height="2" className="pixel-icon__edge" />
    </>
  ),
  bin: (
    <>
      <rect x="8" y="9" width="16" height="18" rx="1" />
      <rect x="6" y="6" width="20" height="4" />
      <rect x="12" y="3" width="8" height="4" className="pixel-icon__dark" />
      <rect x="11" y="13" width="2" height="10" className="pixel-icon__light" />
      <rect x="15" y="13" width="2" height="10" className="pixel-icon__light" />
      <rect x="19" y="13" width="2" height="10" className="pixel-icon__light" />
    </>
  ),
};

export default function PixelIcon({ type }) {
  return (
    <svg
      className="pixel-icon"
      viewBox="0 0 32 32"
      role="img"
      aria-label={`${type} icon`}
      shapeRendering="crispEdges"
    >
      <g>{pixelShapes[type] ?? pixelShapes.objects}</g>
    </svg>
  );
}
