import React from 'react';
import { ArrowUpRightIcon, CodeIcon, GitHubIcon } from 'components/ui';
import styles from './ProjectCard.module.css';

const THUMB_HUES = [262, 190, 320, 150];

export default function ProjectCard({ project, index }) {
  const hue = THUMB_HUES[index % THUMB_HUES.length];

  return (
    <article className={styles.card}>
      <div
        className={styles.thumb}
        style={{
          backgroundImage: `radial-gradient(circle at 25% 20%, hsl(${hue} 90% 65% / 0.55), transparent 60%),
            radial-gradient(circle at 80% 90%, hsl(${hue + 60} 90% 60% / 0.45), transparent 55%)`,
        }}
      >
        <span className={styles.thumbIcon}>
          <CodeIcon size={30} />
        </span>
        {project.featured && <span className={styles.featured}>Featured</span>}
      </div>

      <div className={styles.body}>
        <span className={styles.category}>{project.category}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>

        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>

        <div className={styles.links}>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live demo <ArrowUpRightIcon size={16} />
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <GitHubIcon size={16} /> Source
            </a>
          )}
          {!project.liveUrl && !project.repoUrl && (
            <span className={styles.soon}>Coming soon</span>
          )}
        </div>
      </div>
    </article>
  );
}
