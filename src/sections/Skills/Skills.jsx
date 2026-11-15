import React from 'react';
import { skillGroups } from 'data';
import { Reveal, SectionHeading } from 'components/ui';
import styles from './Skills.module.css';

export default function Skills() {
  return (
    <section id="skills" className={`section ${styles.skills}`}>
      <div className="container">
        <SectionHeading
          eyebrow="Toolbox"
          title="Skills & technologies"
          subtitle="The tools I reach for to design, build, and ship modern web products."
        />

        <div className={styles.grid}>
          {skillGroups.map(({ title, items }, index) => (
            <Reveal key={title} delay={index * 120} className={styles.card}>
              <span className={styles.index}>0{index + 1}</span>
              <h3>{title}</h3>
              <ul className={styles.list}>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
