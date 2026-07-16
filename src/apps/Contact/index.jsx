import { useMemo, useState } from "react";

import profile from "../../data/profile";

import "./Contact.css";

const initialForm = {
  name: "",
  email: "",
  message: "",
};

function buildMailto(form) {
  const subject = form.name
    ? `MAGI OS enquiry from ${form.name}`
    : "MAGI OS project enquiry";

  const body = [
    form.message,
    "",
    "---",
    `FROM: ${form.name || "Not supplied"}`,
    `REPLY TO: ${form.email || "Not supplied"}`,
    "SENT VIA: MAGI OS / CONTACT.EXE",
  ].join("\n");

  return `mailto:${profile.email}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [copyState, setCopyState] = useState("COPY ADDRESS");

  const mailto = useMemo(() => buildMailto(form), [form]);

  function updateField(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("ADDRESS COPIED");
    } catch {
      setCopyState("COPY FAILED");
    }

    window.setTimeout(() => {
      setCopyState("COPY ADDRESS");
    }, 1800);
  }

  function sendMessage(event) {
    event.preventDefault();
    window.location.href = mailto;
  }

  return (
    <section className="contact-app">
      <header className="contact-app__header">
        <div>
          <p>MAGI NETWORK / COMMUNICATION NODE</p>
          <h2>CONTACT.EXE</h2>
        </div>

        <div
          className={`contact-app__availability${
            profile.availability.open
              ? " contact-app__availability--open"
              : ""
          }`}
        >
          <i />
          <span>
            {profile.availability.open ? "CHANNEL OPEN" : "CHANNEL CLOSED"}
          </span>
        </div>
      </header>

      <div className="contact-app__layout">
        <aside className="contact-app__identity">
          <div className="contact-app__portrait">
            <img
              src={`${import.meta.env.BASE_URL}${profile.photo}`}
              alt={`${profile.name} in Melbourne at night`}
            />
            <span>IDENTITY_IMAGE / JACK_MAGI</span>
            <i aria-hidden="true" />
          </div>

          <div className="contact-app__person">
            <span>REGISTERED OPERATOR</span>
            <h3>{profile.name}</h3>
            <p>{profile.role}</p>
          </div>

          <dl className="contact-app__data">
            <div>
              <dt>LOCATION</dt>
              <dd>{profile.location}</dd>
            </div>

            <div>
              <dt>STATUS</dt>
              <dd>{profile.availability.label}</dd>
            </div>

            <div>
              <dt>INTERESTS</dt>
              <dd>{profile.availability.note}</dd>
            </div>
          </dl>

          <div className="contact-app__email">
            <span>PRIMARY ADDRESS</span>
            <a href={`mailto:${profile.email}`} data-cursor="SEND EMAIL">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              data-cursor="COPY EMAIL"
            >
              {copyState}
            </button>
          </div>

          <nav className="contact-app__socials" aria-label="Social links">
            {profile.socials.map((social, index) => {
              const content = (
                <>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <small>{social.label}</small>
                    <strong>{social.handle}</strong>
                  </div>
                  <b>{social.url ? "↗" : "—"}</b>
                </>
              );

              return social.url ? (
                <a
                  className="contact-app__social-link"
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={`OPEN ${social.label}`}
                >
                  {content}
                </a>
              ) : (
                <div
                  className="contact-app__social-link contact-app__social-link--disabled"
                  key={social.id}
                  aria-label={`${social.label} coming soon`}
                >
                  {content}
                </div>
              );
            })}
          </nav>
        </aside>

        <form className="contact-app__composer" onSubmit={sendMessage}>
          <header>
            <div>
              <span>NEW TRANSMISSION</span>
              <strong>MESSAGE COMPOSER</strong>
            </div>

            <small>SECURE CHANNEL / MAIL CLIENT</small>
          </header>

          <label>
            <span>01 / YOUR NAME</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="ENTER NAME"
              autoComplete="name"
            />
          </label>

          <label>
            <span>02 / REPLY ADDRESS</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={updateField}
              placeholder="ENTER EMAIL"
              autoComplete="email"
            />
          </label>

          <label className="contact-app__message-field">
            <span>03 / TRANSMISSION</span>
            <textarea
              name="message"
              value={form.message}
              onChange={updateField}
              placeholder="TELL ME ABOUT THE PROJECT..."
              required
            />
          </label>

          <footer>
            <div>
              <i />
              <span>OPENS YOUR DEFAULT EMAIL APPLICATION</span>
            </div>

            <button type="submit" data-cursor="SEND MESSAGE">
              TRANSMIT MESSAGE
              <span>↗</span>
            </button>
          </footer>
        </form>
      </div>
    </section>
  );
}
