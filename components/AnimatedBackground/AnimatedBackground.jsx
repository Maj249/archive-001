import "./AnimatedBackground.css";

export default function AnimatedBackground() {
  return (
    <div className="system-bg" aria-hidden="true">
      <div className="system-bg__grid" />
      <div className="system-bg__orb system-bg__orb--one" />
      <div className="system-bg__orb system-bg__orb--two" />
      <div className="system-bg__orb system-bg__orb--three" />

      <div className="system-bg__wire system-bg__wire--one">
        <span /><span /><span />
      </div>

      <div className="system-bg__wire system-bg__wire--two">
        <span /><span /><span />
      </div>

      <div className="system-bg__scanner" />

      <div className="system-bg__particles">
        {Array.from({ length: 20 }, (_, i) => (
          <span key={i} style={{ "--i": i }} />
        ))}
      </div>

      <div className="system-bg__noise" />
      <div className="system-bg__scanlines" />
      <div className="system-bg__vignette" />
    </div>
  );
}
