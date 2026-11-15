import React, { useMemo, useState } from 'react';
import { projects } from 'data';
import { Reveal, SectionHeading } from 'components/ui';
import ProjectCard from './ProjectCard';
import styles from './Projects.module.css';

const ALL = 'All';

export default function Projects() {
  const [filter, setFilter] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...new Set(projects.map((project) => project.category))],
    []
  );

  const visible = filter === ALL ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <div className={styles.header}>
          <SectionHeading
            eyebrow="Selected work"
            title="Featured projects"
            subtitle="A few things I have designed and built recently."
          />
          <Reveal className={styles.filters} role="group" aria-label="Filter projects">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={filter === category}
                className={`${styles.filter} ${filter === category ? styles.filterActive : ''}`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </Reveal>
        </div>

        <div className={styles.grid}>
          {visible.map((project, index) => (
            <Reveal key={project.id} delay={index * 100}>
              <ProjectCard project={project} index={projects.indexOf(project)} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
