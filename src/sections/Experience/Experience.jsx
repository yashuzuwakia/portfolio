import React from 'react';
import { experience } from 'data';
import { Reveal, SectionHeading } from 'components/ui';
import styles from './Experience.module.css';

export default function Experience() {
  return (
    <section id="experience" className={`section ${styles.experience}`}>
      <div className="container">
        <SectionHeading eyebrow="Journey" title="Experience & education" align="center" />

        <ol className={styles.timeline}>
          {experience.map(({ period, role, company, description }, index) => (
            <Reveal as="li" key={`${role}-${period}`} delay={index * 120} className={styles.item}>
              <span className={styles.dot} aria-hidden="true" />
              <div className={styles.card}>
                <span className={styles.period}>{period}</span>
                <h3>{role}</h3>
                <p className={styles.company}>{company}</p>
                {description && <p className={styles.description}>{description}</p>}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
