import { useCallback, useEffect, useRef, useState } from "react";

import "./SnakeGame.css";

const COLUMNS = 24;
const ROWS = 18;
const STARTING_SNAKE = [
  { x: 7, y: 9 },
  { x: 6, y: 9 },
  { x: 5, y: 9 },
];
const STARTING_DIRECTION = { x: 1, y: 0 };

function makeFood(snake) {
  const occupied = new Set(snake.map(({ x, y }) => `${x}:${y}`));
  const available = [];

  for (let y = 0; y < ROWS; y += 1) {
    for (let x = 0; x < COLUMNS; x += 1) {
      if (!occupied.has(`${x}:${y}`)) {
        available.push({ x, y });
      }
    }
  }

  return available[Math.floor(Math.random() * available.length)] ?? null;
}

function getSavedHighScore() {
  try {
    return Number(window.localStorage.getItem("magi-snake-high-score")) || 0;
  } catch {
    return 0;
  }
}

export default function SnakeGame({ onExit }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(null);
  const previousTimeRef = useRef(0);
  const accumulatorRef = useRef(0);
  const snakeRef = useRef(STARTING_SNAKE);
  const foodRef = useRef(makeFood(STARTING_SNAKE));
  const directionRef = useRef(STARTING_DIRECTION);
  const queuedDirectionRef = useRef(STARTING_DIRECTION);
  const touchStartRef = useRef(null);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(getSavedHighScore);
  const [status, setStatus] = useState("playing");

  const restart = useCallback(() => {
    snakeRef.current = STARTING_SNAKE.map((segment) => ({ ...segment }));
    foodRef.current = makeFood(snakeRef.current);
    directionRef.current = STARTING_DIRECTION;
    queuedDirectionRef.current = STARTING_DIRECTION;
    previousTimeRef.current = 0;
    accumulatorRef.current = 0;
    setScore(0);
    setStatus("playing");
  }, []);

  const chooseDirection = useCallback((nextDirection) => {
    const current = directionRef.current;

    if (
      current.x + nextDirection.x === 0 &&
      current.y + nextDirection.y === 0
    ) {
      return;
    }

    queuedDirectionRef.current = nextDirection;
  }, []);

  const finishGame = useCallback((finalScore) => {
    setStatus("game-over");

    setHighScore((currentHighScore) => {
      const nextHighScore = Math.max(currentHighScore, finalScore);

      try {
        window.localStorage.setItem(
          "magi-snake-high-score",
          String(nextHighScore)
        );
      } catch {
        // Storage is optional. The game still works if it is unavailable.
      }

      return nextHighScore;
    });
  }, []);

  const moveSnake = useCallback(() => {
    if (status !== "playing") return;

    directionRef.current = queuedDirectionRef.current;

    const snake = snakeRef.current;
    const direction = directionRef.current;
    const head = snake[0];
    const nextHead = {
      x: head.x + direction.x,
      y: head.y + direction.y,
    };

    const hitWall =
      nextHead.x < 0 ||
      nextHead.x >= COLUMNS ||
      nextHead.y < 0 ||
      nextHead.y >= ROWS;

    const hitSelf = snake.some(
      (segment) => segment.x === nextHead.x && segment.y === nextHead.y
    );

    if (hitWall || hitSelf) {
      finishGame(score);
      return;
    }

    const nextSnake = [nextHead, ...snake];
    const food = foodRef.current;
    const ateFood = food && nextHead.x === food.x && nextHead.y === food.y;

    if (ateFood) {
      const nextScore = score + 10;
      setScore(nextScore);
      foodRef.current = makeFood(nextSnake);
    } else {
      nextSnake.pop();
    }

    snakeRef.current = nextSnake;
  }, [finishGame, score, status]);

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const bounds = canvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(bounds.width * pixelRatio));
    const height = Math.max(1, Math.floor(bounds.height * pixelRatio));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const context = canvas.getContext("2d");
    if (!context) return;

    const cellWidth = width / COLUMNS;
    const cellHeight = height / ROWS;

    context.clearRect(0, 0, width, height);
    context.fillStyle = "#030503";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "rgba(105, 255, 92, 0.08)";
    context.lineWidth = Math.max(1, pixelRatio * 0.5);

    for (let x = 0; x <= COLUMNS; x += 1) {
      context.beginPath();
      context.moveTo(x * cellWidth, 0);
      context.lineTo(x * cellWidth, height);
      context.stroke();
    }

    for (let y = 0; y <= ROWS; y += 1) {
      context.beginPath();
      context.moveTo(0, y * cellHeight);
      context.lineTo(width, y * cellHeight);
      context.stroke();
    }

    snakeRef.current.forEach((segment, index) => {
      const inset = Math.max(1.5 * pixelRatio, Math.min(cellWidth, cellHeight) * 0.12);
      const x = segment.x * cellWidth + inset;
      const y = segment.y * cellHeight + inset;
      const segmentWidth = cellWidth - inset * 2;
      const segmentHeight = cellHeight - inset * 2;

      context.shadowBlur = index === 0 ? 18 * pixelRatio : 8 * pixelRatio;
      context.shadowColor = "#62ff54";
      context.fillStyle = index === 0 ? "#ecffe9" : "#62ff54";
      context.fillRect(x, y, segmentWidth, segmentHeight);
    });

    context.shadowBlur = 0;

    const food = foodRef.current;
    if (food) {
      const centreX = (food.x + 0.5) * cellWidth;
      const centreY = (food.y + 0.5) * cellHeight;
      const radius = Math.min(cellWidth, cellHeight) * 0.28;

      context.beginPath();
      context.arc(centreX, centreY, radius, 0, Math.PI * 2);
      context.shadowBlur = 16 * pixelRatio;
      context.shadowColor = "#ffb52d";
      context.fillStyle = "#ffb52d";
      context.fill();
      context.shadowBlur = 0;
    }
  }, []);

  useEffect(() => {
    const speed = Math.max(72, 142 - Math.floor(score / 40) * 8);

    function animate(time) {
      if (!previousTimeRef.current) previousTimeRef.current = time;

      const elapsed = Math.min(time - previousTimeRef.current, 250);
      previousTimeRef.current = time;

      if (status === "playing") {
        accumulatorRef.current += elapsed;

        while (accumulatorRef.current >= speed) {
          moveSnake();
          accumulatorRef.current -= speed;
        }
      }

      drawGame();
      frameRef.current = window.requestAnimationFrame(animate);
    }

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameRef.current);
    };
  }, [drawGame, moveSnake, score, status]);

  useEffect(() => {
    function handleKeyDown(event) {
      const directions = {
        ArrowUp: { x: 0, y: -1 },
        w: { x: 0, y: -1 },
        W: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        s: { x: 0, y: 1 },
        S: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        a: { x: -1, y: 0 },
        A: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
        d: { x: 1, y: 0 },
        D: { x: 1, y: 0 },
      };

      if (directions[event.key]) {
        event.preventDefault();
        chooseDirection(directions[event.key]);
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        onExit();
        return;
      }

      if (event.key === " " && status !== "game-over") {
        event.preventDefault();
        setStatus((current) => (current === "paused" ? "playing" : "paused"));
        return;
      }

      if (event.key === "Enter" && status === "game-over") {
        event.preventDefault();
        restart();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [chooseDirection, onExit, restart, status]);

  function handleTouchStart(event) {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event) {
    if (!touchStartRef.current) return;

    const touch = event.changedTouches[0];
    const differenceX = touch.clientX - touchStartRef.current.x;
    const differenceY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.max(Math.abs(differenceX), Math.abs(differenceY)) < 24) return;

    if (Math.abs(differenceX) > Math.abs(differenceY)) {
      chooseDirection(differenceX > 0 ? { x: 1, y: 0 } : { x: -1, y: 0 });
    } else {
      chooseDirection(differenceY > 0 ? { x: 0, y: 1 } : { x: 0, y: -1 });
    }
  }

  return (
    <section className="snake-game" aria-label="MAGI Snake game">
      <header className="snake-game__header">
        <div>
          <span>MAGI ARCADE / HIDDEN PROGRAM</span>
          <strong>DEEZ_NUTZ.SNK</strong>
        </div>

        <dl>
          <div>
            <dt>SCORE</dt>
            <dd>{String(score).padStart(4, "0")}</dd>
          </div>
          <div>
            <dt>HIGH</dt>
            <dd>{String(highScore).padStart(4, "0")}</dd>
          </div>
        </dl>

        <button type="button" onClick={onExit} data-cursor="CLOSE GAME">
          EXIT
        </button>
      </header>

      <div
        className="snake-game__screen"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <canvas ref={canvasRef} data-cursor="PLAY SNAKE" />

        {status !== "playing" && (
          <div className="snake-game__message">
            <span>{status === "paused" ? "SYSTEM PAUSED" : "SIGNAL LOST"}</span>
            <strong>{status === "paused" ? "PAUSED" : "GAME OVER"}</strong>
            <p>
              {status === "paused"
                ? "PRESS SPACE TO CONTINUE"
                : "PRESS ENTER OR TAP RESTART"}
            </p>
            {status === "game-over" && (
              <button type="button" onClick={restart} data-cursor="RESTART GAME">
                RESTART
              </button>
            )}
          </div>
        )}
      </div>

      <footer className="snake-game__footer">
        <span>ARROWS / WASD TO MOVE</span>
        <span>SPACE TO PAUSE</span>
        <span>ESC TO EXIT</span>
      </footer>

      <div className="snake-game__mobile-controls" aria-label="Snake controls">
        <button
          type="button"
          className="snake-game__up"
          onClick={() => chooseDirection({ x: 0, y: -1 })}
          aria-label="Move up"
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => chooseDirection({ x: -1, y: 0 })}
          aria-label="Move left"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => chooseDirection({ x: 0, y: 1 })}
          aria-label="Move down"
        >
          ↓
        </button>
        <button
          type="button"
          onClick={() => chooseDirection({ x: 1, y: 0 })}
          aria-label="Move right"
        >
          →
        </button>
      </div>
    </section>
  );
}
