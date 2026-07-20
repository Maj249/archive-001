import { useEffect, useRef } from "react";

import "./AnimatedBackground.css";

const leftTelemetry = [
  "BLOOM_NODE 08",
  "LAT 37.8136",
  "LON 144.9631",
  "FIELD ACTIVE",
  "MESH 101101",
];

const rightTelemetry = [
  "VOLUME 0.84",
  "PHASE 03",
  "SIGNAL +72",
  "DEPTH 1480",
  "SYNC TRUE",
];

function rotatePoint(point, rotationX, rotationY) {
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;

  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);

  return {
    x: x1,
    y: point.y * cosX - z1 * sinX,
    z: point.y * sinX + z1 * cosX,
  };
}

function buildBloom(rings = 14, segments = 30) {
  const points = [];

  for (let ring = 0; ring <= rings; ring += 1) {
    const latitude = (ring / rings - 0.5) * Math.PI;

    for (let segment = 0; segment < segments; segment += 1) {
      const longitude = (segment / segments) * Math.PI * 2;

      points.push({
        ring,
        segment,
        latitude,
        longitude,
      });
    }
  }

  return { points, rings, segments };
}

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d", { alpha: true });
    const mobileMode = window.matchMedia(
      "(max-width: 700px), (hover: none) and (pointer: coarse)"
    ).matches;
    const bloom = buildBloom(
      mobileMode ? 8 : 14,
      mobileMode ? 18 : 30
    );
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let animationFrame = 0;
    let startTime = performance.now();
    let pointerX = 0;
    let pointerY = 0;
    let lastFrame = 0;
    let pageVisible = !document.hidden;

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        mobileMode ? 1 : 1.5
      );

      canvas.width = Math.max(1, Math.floor(width * pixelRatio));
      canvas.height = Math.max(1, Math.floor(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function handlePointerMove(event) {
      pointerX = event.clientX / window.innerWidth - 0.5;
      pointerY = event.clientY / window.innerHeight - 0.5;
    }

    function project(point, time) {
      const rotationY = time * 0.00012 + pointerX * 0.34;
      const rotationX = -0.18 + pointerY * 0.2;
      const rotated = rotatePoint(point, rotationX, rotationY);
      const perspective = 3.8 / (4.25 + rotated.z);
      const scale = Math.min(width, height) * 0.27;

      return {
        x: width * 0.64 + rotated.x * perspective * scale,
        y: height * 0.45 + rotated.y * perspective * scale,
        z: rotated.z,
        perspective,
      };
    }

    function getBloomPoint(item, time) {
      const pulse = reducedMotion ? 0 : time * 0.00045;
      const radius =
        0.78 +
        Math.sin(item.longitude * 3 + pulse) * 0.09 +
        Math.cos(item.latitude * 5 - pulse * 0.7) * 0.055;

      const latitudeRadius = Math.cos(item.latitude);

      return {
        x: latitudeRadius * Math.cos(item.longitude) * radius,
        y: Math.sin(item.latitude) * 1.14,
        z: latitudeRadius * Math.sin(item.longitude) * radius,
      };
    }

    function drawGridBox(time) {
      const vertices = [
        [-1.25, -1.25, -1.25],
        [1.25, -1.25, -1.25],
        [1.25, 1.25, -1.25],
        [-1.25, 1.25, -1.25],
        [-1.25, -1.25, 1.25],
        [1.25, -1.25, 1.25],
        [1.25, 1.25, 1.25],
        [-1.25, 1.25, 1.25],
      ].map(([x, y, z]) => project({ x, y, z }, time));

      const edges = [
        [0, 1],
        [1, 2],
        [2, 3],
        [3, 0],
        [4, 5],
        [5, 6],
        [6, 7],
        [7, 4],
        [0, 4],
        [1, 5],
        [2, 6],
        [3, 7],
      ];

      context.save();
      context.strokeStyle = "rgba(65, 191, 255, 0.18)";
      context.lineWidth = 0.8;

      edges.forEach(([from, to]) => {
        context.beginPath();
        context.moveTo(vertices[from].x, vertices[from].y);
        context.lineTo(vertices[to].x, vertices[to].y);
        context.stroke();
      });

      context.restore();
    }

    function drawBloom(time) {
      const projected = bloom.points.map((item) => {
        return project(getBloomPoint(item, time), time);
      });

      context.save();
      context.globalCompositeOperation = "lighter";
      context.lineWidth = 0.65;

      bloom.points.forEach((item, index) => {
        const current = projected[index];
        const nextSegment =
          projected[
            item.ring * bloom.segments +
              ((item.segment + 1) % bloom.segments)
          ];
        const nextRing =
          item.ring < bloom.rings
            ? projected[index + bloom.segments]
            : null;
        const depth = Math.max(0.14, (current.z + 1.4) / 3);
        const hue = item.ring % 4 === 0 ? "82, 255, 111" : "65, 191, 255";

        context.strokeStyle = `rgba(${hue}, ${0.08 + depth * 0.32})`;
        context.beginPath();
        context.moveTo(current.x, current.y);
        context.lineTo(nextSegment.x, nextSegment.y);
        context.stroke();

        if (nextRing && item.segment % 2 === 0) {
          context.strokeStyle = `rgba(255, 174, 36, ${
            0.025 + depth * 0.13
          })`;
          context.beginPath();
          context.moveTo(current.x, current.y);
          context.lineTo(nextRing.x, nextRing.y);
          context.stroke();
        }

        if ((index + item.ring) % 13 === 0) {
          context.fillStyle = `rgba(180, 255, 212, ${0.32 + depth * 0.48})`;
          context.fillRect(current.x, current.y, 1.2, 1.2);
        }
      });

      context.restore();
    }

    function drawSignalDust(time) {
      context.save();
      context.globalCompositeOperation = "screen";

      for (let index = 0; index < 34; index += 1) {
        const seed = index * 91.73;
        const x = ((seed * 17.31) % width + time * (0.003 + (index % 3) * 0.001)) % width;
        const y = (seed * 7.17) % height;
        const flicker = 0.16 + Math.sin(time * 0.002 + index) * 0.12;

        context.fillStyle =
          index % 4 === 0
            ? `rgba(255, 174, 36, ${flicker})`
            : `rgba(82, 255, 111, ${flicker})`;
        context.fillRect(x, y, index % 5 === 0 ? 3 : 1, 1);
      }

      context.restore();
    }

    function render(now) {
      if (!pageVisible) {
        if (!reducedMotion) {
          animationFrame = window.requestAnimationFrame(render);
        }
        return;
      }

      if (
        mobileMode &&
        !reducedMotion &&
        now - lastFrame < 1000 / 30
      ) {
        animationFrame = window.requestAnimationFrame(render);
        return;
      }

      lastFrame = now;
      const time = reducedMotion ? 0 : now - startTime;

      context.clearRect(0, 0, width, height);
      drawSignalDust(time);
      drawGridBox(time);
      drawBloom(time);

      if (!reducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    }

    function handleVisibilityChange() {
      pageVisible = !document.hidden;
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    if (!mobileMode) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
    }

    animationFrame = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <div className="animated-background" aria-hidden="true">
      <div className="animated-background__void" />
      <div className="animated-background__ceiling" />
      <div className="animated-background__floor" />

      <canvas ref={canvasRef} className="animated-background__canvas" />

      <div className="animated-background__frame">
        <i />
        <i />
        <i />
        <i />
      </div>

      <TelemetryRail
        className="animated-background__telemetry--left"
        title="BIOFORM_SCAN"
        lines={leftTelemetry}
      />

      <TelemetryRail
        className="animated-background__telemetry--right"
        title="FIELD_DATA"
        lines={rightTelemetry}
      />

      <div className="animated-background__target">
        <span />
        <span />
      </div>

      <div className="animated-background__scanline" />
      <div className="animated-background__noise" />
      <div className="animated-background__vignette" />
    </div>
  );
}

function TelemetryRail({ className, title, lines }) {
  return (
    <div className={`animated-background__telemetry ${className}`}>
      <strong>{title}</strong>
      {lines.map((line, index) => (
        <span key={line}>
          {String(index + 1).padStart(2, "0")} / {line}
        </span>
      ))}
    </div>
  );
}


