import React from 'react';
import { about, profile } from 'data';
import { MailIcon, MapPinIcon, Reveal, SectionHeading } from 'components/ui';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHeading eyebrow="About me" title="Design-minded developer" />

        <div className={styles.grid}>
          <Reveal className={styles.portrait}>
            <div className={styles.avatar}>
              <span>{profile.initials}</span>
            </div>
            <ul className={styles.meta}>
              <li>
                <MapPinIcon size={16} />
                {profile.location}
              </li>
              <li>
                <MailIcon size={16} />
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
            </ul>
          </Reveal>

          <div className={styles.body}>
            {about.paragraphs.map((text, index) => (
              <Reveal as="p" key={text} delay={index * 120} className={styles.paragraph}>
                {text}
              </Reveal>
            ))}

            <div className={styles.stats}>
              {about.stats.map(({ value, label }, index) => (
                <Reveal key={label} delay={200 + index * 120} className={styles.stat}>
                  <strong className="gradient-text">{value}</strong>
                  <span>{label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
