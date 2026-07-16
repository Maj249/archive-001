import music from "../../data/music";

import "./Music.css";

export default function Music() {
  const hasSpotifyLink = Boolean(music.spotifyUrl?.trim());

  return (
    <section className="music-app">
      <header className="music-app__header">
        <div>
          <span>MAGI AUDIO SYSTEM / PERSONAL FREQUENCY</span>
          <h2>MUSIC.EXE</h2>
        </div>

        <div className="music-app__status">
          <i />
          {hasSpotifyLink ? "SPOTIFY LINKED" : "LINK PENDING"}
        </div>
      </header>

      <div className="music-app__body">
        <section className="music-app__visual" aria-hidden="true">
          <div className="music-app__disc">
            <div className="music-app__spotify-mark">
              <SpotifyMark />
            </div>
          </div>

          <div className="music-app__equaliser">
            {Array.from({ length: 28 }, (_, index) => (
              <i
                key={index}
                style={{
                  "--level": `${20 + ((index * 37) % 76)}%`,
                  "--delay": `${index * -0.055}s`,
                }}
              />
            ))}
          </div>
        </section>

        <section className="music-app__profile">
          <p>PERSONAL AUDIO ARCHIVE</p>
          <h1>MUSIC<br />MATTERS.</h1>
          <div className="music-app__statement">{music.statement}</div>

          <dl>
            <div>
              <dt>OPERATOR</dt>
              <dd>{music.profileName}</dd>
            </div>

            <div>
              <dt>SERVICE</dt>
              <dd>SPOTIFY</dd>
            </div>

            <div>
              <dt>CONNECTION</dt>
              <dd>{hasSpotifyLink ? "ACTIVE" : "WAITING FOR URL"}</dd>
            </div>
          </dl>

          {hasSpotifyLink ? (
            <a
              className="music-app__launch"
              href={music.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN SPOTIFY"
            >
              OPEN MY SPOTIFY
              <span>↗</span>
            </a>
          ) : (
            <div className="music-app__launch music-app__launch--disabled">
              ADD SPOTIFY URL IN MUSIC.JS
              <span>...</span>
            </div>
          )}
        </section>
      </div>

      <footer className="music-app__footer">
        <span>MAGI AUDIO NODE / 001</span>
        <strong>PERSONAL FREQUENCY ONLINE</strong>
        <span>SPOTIFY EXTERNAL LINK</span>
      </footer>
    </section>
  );
}

function SpotifyMark() {
  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="Spotify">
      <circle cx="50" cy="50" r="48" />
      <path d="M24 38c18-6 42-4 57 4" />
      <path d="M28 52c15-5 34-3 48 4" />
      <path d="M32 65c12-3 27-2 38 3" />
    </svg>
  );
}
