import React, { useEffect, useState } from 'react';
import { profile } from 'data';
import { ArrowDownIcon, ArrowUpRightIcon, Button, SocialLinks } from 'components/ui';
import CodeWindow from './CodeWindow';
import styles from './Hero.module.css';

const ROLE_INTERVAL_MS = 2600;

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setRoleIndex((index) => (index + 1) % profile.roles.length),
      ROLE_INTERVAL_MS
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.grid} />
        <div className={`${styles.blob} ${styles.blobOne}`} />
        <div className={`${styles.blob} ${styles.blobTwo}`} />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          {profile.available && (
            <span className={styles.badge}>
              <span className={styles.pulse} />
              Available for new opportunities
            </span>
          )}

          <h1 className={styles.title}>
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </h1>

          <p className={styles.role}>
            <span key={roleIndex} className={styles.roleText}>
              {profile.roles[roleIndex]}
            </span>
          </p>

          <p className={styles.tagline}>{profile.tagline}</p>

          <div className={styles.actions}>
            <Button href="#projects" icon={<ArrowUpRightIcon size={18} />}>
              View my work
            </Button>
            <Button
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              icon={<ArrowUpRightIcon size={18} />}
            >
              My resume
            </Button>
          </div>

          <SocialLinks />
        </div>

        <div className={styles.visual} aria-hidden="true">
          <CodeWindow />
          <div className={`${styles.chip} ${styles.chipOne}`}>React</div>
          <div className={`${styles.chip} ${styles.chipTwo}`}>UI / UX</div>
        </div>
      </div>

      <a href="#about" className={styles.scrollHint} aria-label="Scroll to About">
        <ArrowDownIcon size={18} />
      </a>
    </section>
  );
}
