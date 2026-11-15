import React from 'react';
import { navLinks, profile } from 'data';
import { SocialLinks } from 'components/ui';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logoMark}>{profile.initials}</span>
          <p>
            &copy; {year} {profile.name}. Designed &amp; built with React.
          </p>
        </div>

        <nav className={styles.links} aria-label="Footer">
          {navLinks.map(({ id, label }) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <SocialLinks size="sm" />
      </div>
    </footer>
  );
}
