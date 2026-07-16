import profile from "../../data/profile";
import resume from "../../data/resume";

import "./Resume.css";

export default function Resume() {
  const resumeUrl = `${import.meta.env.BASE_URL}${resume.fileName}`;

  return (
    <article className="resume-app">
      <header className="resume-app__system-header">
        <div>
          <span>MAGI DRIVE / PERSONNEL FILE</span>
          <strong>RESUME.PDF</strong>
        </div>

        <div className="resume-app__actions">
          <button
            type="button"
            onClick={() => window.print()}
            data-cursor="PRINT RESUME"
          >
            PRINT
          </button>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            data-cursor="VIEW PDF"
          >
            VIEW PDF ↗
          </a>

          <a href={resumeUrl} download data-cursor="DOWNLOAD PDF">
            DOWNLOAD ↓
          </a>
        </div>
      </header>

      <div className="resume-app__document">
        <header className="resume-app__hero">
          <div className="resume-app__monogram" aria-hidden="true">
            M
          </div>

          <div className="resume-app__title">
            <p>CURRICULUM VITAE / {resume.lastUpdated}</p>
            <h1>{profile.name}</h1>
            <strong>{resume.headline}</strong>
          </div>

          <div className="resume-app__contact">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span>{profile.availability.label}</span>
          </div>
        </header>

        <div className="resume-app__body">
          <aside className="resume-app__sidebar">
            <ResumeList number="01" title="CAPABILITIES" items={resume.capabilities} />
            <ResumeList number="02" title="SOFTWARE" items={resume.software} />

            <section className="resume-app__education">
              <SectionHeading number="03" title="EDUCATION" />

              {resume.education.map((item) => (
                <article key={`${item.period}-${item.qualification}`}>
                  <span>{item.period}</span>
                  <h3>{item.qualification}</h3>
                  <p>{item.institution}</p>
                </article>
              ))}
            </section>
          </aside>

          <main className="resume-app__main">
            <section className="resume-app__profile">
              <SectionHeading number="04" title="PROFILE" />
              <p>{resume.summary}</p>
            </section>

            <section className="resume-app__experience">
              <SectionHeading number="05" title="EXPERIENCE / SELECTED ACTIVITY" />

              <div className="resume-app__timeline">
                {resume.experience.map((item, index) => (
                  <article key={`${item.period}-${item.role}`}>
                    <div className="resume-app__timeline-index">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <i />
                    </div>

                    <div className="resume-app__timeline-content">
                      <span>{item.period}</span>
                      <h3>{item.role}</h3>
                      <strong>{item.organisation}</strong>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>

        <footer className="resume-app__footer">
          <span>MAGI INDUSTRIES® / PERSONNEL DATABASE</span>
          <strong>END OF FILE</strong>
          <span>DOCUMENT: {resume.fileName.toUpperCase()}</span>
        </footer>
      </div>
    </article>
  );
}

function SectionHeading({ number, title }) {
  return (
    <header className="resume-section-heading">
      <span>{number}</span>
      <h2>{title}</h2>
    </header>
  );
}

function ResumeList({ number, title, items }) {
  return (
    <section className="resume-app__list">
      <SectionHeading number={number} title={title} />

      <ul>
        {items.map((item, index) => (
          <li key={item}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

