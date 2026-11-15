import React, { useState } from 'react';
import { profile } from 'data';
import {
  Button,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  Reveal,
  SectionHeading,
  SendIcon,
} from 'components/ui';
import styles from './Contact.module.css';

const initialForm = { name: '', email: '', message: '' };

const channels = [
  { label: 'Email', value: profile.email, href: `mailto:${profile.email}`, Icon: MailIcon },
  { label: 'GitHub', value: 'View my code', href: profile.socials.github, Icon: GitHubIcon },
  { label: 'LinkedIn', value: 'Connect with me', href: profile.socials.linkedin, Icon: LinkedInIcon },
];

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className={styles.panel}>
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.intro}>
            <SectionHeading
              eyebrow="Contact"
              title="Let's build something great together"
              subtitle="Have a project, a role, or just want to say hello? My inbox is always open."
            />
            <ul className={styles.channels}>
              {channels.map(({ label, value, href, Icon }, index) => (
                <Reveal as="li" key={label} delay={index * 100}>
                  <a
                    href={href}
                    className={styles.channel}
                    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <span className={styles.channelIcon}>
                      <Icon size={18} />
                    </span>
                    <span>
                      <small>{label}</small>
                      {value}
                    </span>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal as="form" delay={150} className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                placeholder=" "
                value={form.name}
                onChange={handleChange}
              />
              <label htmlFor="name">Your name</label>
            </div>
            <div className={styles.field}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder=" "
                value={form.email}
                onChange={handleChange}
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className={styles.field}>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder=" "
                value={form.message}
                onChange={handleChange}
              />
              <label htmlFor="message">Your message</label>
            </div>
            <Button as="button" type="submit" icon={<SendIcon size={16} />} className={styles.submit}>
              Send message
            </Button>
            <p className={styles.note} role="status">
              {sent && (
                <>
                  Your mail app should open with the draft. If it didn&apos;t, email me at{' '}
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                </>
              )}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
