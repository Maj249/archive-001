function IconFrame({ children, title }) {
  return (
    <svg
      className="project-glyph"
      viewBox="0 0 160 160"
      role="img"
      aria-label={`${title} illustrated project icon`}
    >
      <defs>
        <linearGradient id="glyph-lime" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eaffd8" />
          <stop offset="0.48" stopColor="#7cff6b" />
          <stop offset="1" stopColor="#1a9f69" />
        </linearGradient>
        <linearGradient id="glyph-cyan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#b8f4ff" />
          <stop offset="1" stopColor="#41bfff" />
        </linearGradient>
        <linearGradient id="glyph-violet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d8ceff" />
          <stop offset="1" stopColor="#8a72ff" />
        </linearGradient>
        <filter id="glyph-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g className="project-glyph__shadow" opacity="0.28">
        <ellipse cx="80" cy="137" rx="46" ry="8" fill="#000" />
      </g>

      <g className="project-glyph__object" filter="url(#glyph-glow)">
        {children}
      </g>
    </svg>
  );
}

function GermaprobeGlyph({ title }) {
  return (
    <IconFrame title={title}>
      <g transform="rotate(35 80 80)">
        <circle cx="80" cy="22" r="8" fill="none" stroke="url(#glyph-cyan)" strokeWidth="5" />
        <path
          d="M75 31 65 100 80 132 95 100 85 31Z"
          fill="#111817"
          stroke="url(#glyph-lime)"
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path d="M80 36 76 103 80 118 84 103 84 36Z" fill="url(#glyph-cyan)" opacity="0.8" />
        <path d="M66 88 43 111 69 106Z" fill="url(#glyph-violet)" stroke="#7cff6b" strokeWidth="3" />
        <path d="M94 88 117 111 91 106Z" fill="url(#glyph-violet)" stroke="#7cff6b" strokeWidth="3" />
        <path d="M70 100 58 125 77 113Z" fill="#17231f" stroke="#7cff6b" strokeWidth="3" />
        <path d="M90 100 102 125 83 113Z" fill="#17231f" stroke="#7cff6b" strokeWidth="3" />
      </g>
    </IconFrame>
  );
}

function ControllerGlyph({ title }) {
  return (
    <IconFrame title={title}>
      <path
        d="M31 69C34 46 47 37 65 41l15 7 15-7c18-4 31 5 34 28l9 43c3 16-10 24-21 13l-19-22H62l-19 22c-11 11-24 3-21-13Z"
        fill="#101515"
        stroke="url(#glyph-lime)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M80 48v55" stroke="#243532" strokeWidth="3" />
      <circle cx="57" cy="69" r="12" fill="url(#glyph-cyan)" stroke="#d9ffff" strokeWidth="3" />
      <circle cx="98" cy="90" r="11" fill="url(#glyph-violet)" stroke="#e6e0ff" strokeWidth="3" />
      <path d="M48 94h22M59 83v22" stroke="#eaffd8" strokeWidth="7" strokeLinecap="round" />
      <circle cx="108" cy="65" r="5" fill="#7cff6b" />
      <circle cx="119" cy="76" r="5" fill="#41bfff" />
      <circle cx="97" cy="76" r="5" fill="#a995ff" />
      <circle cx="108" cy="87" r="5" fill="#fff0b3" />
      <path d="M68 115h24" stroke="#7cff6b" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
    </IconFrame>
  );
}

function DrinkingTrayGlyph({ title }) {
  return (
    <IconFrame title={title}>
      <path
        d="M26 74 74 47l62 29-49 32Z"
        fill="#9a692d"
        stroke="url(#glyph-lime)"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M26 74v20l61 32v-18Z" fill="#49311c" stroke="#7cff6b" strokeWidth="3" />
      <path d="M87 108v18l49-31V76Z" fill="#6d4723" stroke="#41bfff" strokeWidth="3" />
      <path d="M40 76 76 57M52 83 87 63M64 90 98 69M76 97 109 75M89 103 121 82" stroke="#f8d48b" strokeWidth="5" strokeLinecap="round" />
      <path d="M40 76 76 57M64 90 98 69M89 103 121 82" stroke="#a995ff" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
      <circle cx="100" cy="83" r="10" fill="#09100e" stroke="#7cff6b" strokeWidth="3" />
      <circle cx="100" cy="83" r="4" fill="#41bfff" />
    </IconFrame>
  );
}

function SwagaGlyph({ title }) {
  return (
    <IconFrame title={title}>
      <path d="M59 99 48 126h64L101 99Z" fill="#17201e" stroke="#7cff6b" strokeWidth="4" />
      <path d="M57 59c0-20 46-20 46 0v29c0 21-46 21-46 0Z" fill="#3a4540" stroke="#7cff6b" strokeWidth="4" />
      <path d="M50 67 41 43l21 9-4-28 20 20 8-29 10 29 21-20-6 28 25-8-21 24Z" fill="url(#glyph-lime)" stroke="#dfffd7" strokeWidth="3" strokeLinejoin="round" />
      <path d="M47 61h66l-9 24H57Z" fill="#0d1414" stroke="url(#glyph-cyan)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M60 68h40" stroke="#a995ff" strokeWidth="5" strokeLinecap="round" />
      <path d="M74 93q6 5 12 0" fill="none" stroke="#dfffd7" strokeWidth="3" strokeLinecap="round" />
      <path d="M54 126h52" stroke="#41bfff" strokeWidth="4" strokeLinecap="round" />
    </IconFrame>
  );
}

function FallbackGlyph({ title }) {
  return (
    <IconFrame title={title}>
      <path d="M39 45h82v72H39Z" fill="#101716" stroke="url(#glyph-lime)" strokeWidth="5" />
      <path d="M39 61h82M55 45V31h33l14 14" fill="none" stroke="url(#glyph-cyan)" strokeWidth="5" />
      <circle cx="80" cy="88" r="20" fill="none" stroke="url(#glyph-violet)" strokeWidth="5" />
      <path d="M66 88h28M80 74v28" stroke="#7cff6b" strokeWidth="4" strokeLinecap="round" />
    </IconFrame>
  );
}

const glyphs = {
  germaprobe: GermaprobeGlyph,
  "game-controller": ControllerGlyph,
  "drinking-tray": DrinkingTrayGlyph,
  swaga: SwagaGlyph,
};

export default function ProjectGlyph({ project }) {
  const Glyph = glyphs[project.slug] ?? FallbackGlyph;
  return <Glyph title={project.title} />;
}
