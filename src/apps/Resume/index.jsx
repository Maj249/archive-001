import profile from "../../data/profile";
import resume from "../../data/resume";

import "./Resume.css";

export default function Resume() {
  const resumeUrl = `${import.meta.env.BASE_URL}${resume.fileName}`;
  const resumeImageUrl = `${import.meta.env.BASE_URL}resume.jpg`;

  function printResume() {
    const printWindow = window.open(resumeUrl, "_blank");
    let hasPrinted = false;

    if (!printWindow) return;

    const triggerPrint = () => {
      if (hasPrinted) return;

      try {
        hasPrinted = true;
        printWindow.focus();
        printWindow.print();
      } catch {
        hasPrinted = false;
      }
    };

    printWindow.addEventListener?.("load", triggerPrint, { once: true });
    window.setTimeout(triggerPrint, 1200);
  }

  return (
    <article className="resume-app resume-app--preview-layout">
      <header className="resume-app__system-header">
        <div>
          <span>MAGI DRIVE / PERSONNEL FILE</span>
          <strong>RESUME.PDF</strong>
        </div>

        <div className="resume-app__actions">
          <button type="button" onClick={printResume} data-cursor="PRINT RESUME">
            PRINT
          </button>
          <a href={resumeUrl} target="_blank" rel="noreferrer" data-cursor="OPEN PDF">
            OPEN EXTERNALLY ↗
          </a>
          <a href={resumeUrl} download={resume.fileName} data-cursor="DOWNLOAD PDF">
            DOWNLOAD ↓
          </a>
        </div>
      </header>

      <div className="resume-app__workspace">
        <aside className="resume-app__sidebar">
          <header className="resume-app__hero resume-app__hero--sidebar">
            <div className="resume-app__monogram" aria-hidden="true">M</div>

            <div className="resume-app__title">
              <p>CURRICULUM VITAE / {resume.lastUpdated}</p>
              <h1>{profile.name}</h1>
              <strong>{resume.headline}</strong>
            </div>

            <div className="resume-app__contact">
              <div className="resume-app__contact-item">
                <small>LOCATION</small>
                <span>{profile.location}</span>
              </div>

              <div className="resume-app__contact-item">
                <small>EMAIL</small>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>

              <div className="resume-app__contact-item">
                <small>AVAILABILITY</small>
                <span>{profile.availability.label}</span>
              </div>
            </div>
          </header>

          <section className="resume-app__profile">
            <SectionHeading number="01" title="PROFILE" />
            <p>{resume.summary}</p>
          </section>

          <ResumeList number="02" title="CAPABILITIES" items={resume.capabilities} />
          <ResumeList number="03" title="SOFTWARE" items={resume.software} />

          <section className="resume-app__education">
            <SectionHeading number="04" title="EDUCATION" />
            {resume.education.map((item) => (
              <article key={`${item.period}-${item.qualification}`}>
                <span>{item.period}</span>
                <h3>{item.qualification}</h3>
                <p>{item.institution}</p>
              </article>
            ))}
          </section>
        </aside>

        <main className="resume-app__preview-panel">
          <header className="resume-app__preview-header">
            <div>
              <span>DOCUMENT PREVIEW</span>
              <strong>{resume.fileName.toUpperCase()}</strong>
            </div>
            <div>
              <span>STATUS</span>
              <strong>LIVE / READY</strong>
            </div>
          </header>

          <div className="resume-app__preview">
            <img
              src={resumeImageUrl}
              alt={`${profile.name} resume`}
              loading="eager"
              decoding="async"
            />
          </div>

          <footer className="resume-app__preview-footer">
            <span>DOCUMENT: {resume.fileName.toUpperCase()}</span>
            <strong>LIGHTWEIGHT IMAGE PREVIEW</strong>
            <span>MAGI PERSONNEL DATABASE</span>
          </footer>
        </main>
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
