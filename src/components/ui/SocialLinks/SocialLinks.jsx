import React from 'react';
import { profile } from 'data';
import { GitHubIcon, LinkedInIcon, MailIcon } from '../Icons';
import styles from './SocialLinks.module.css';

const links = [
  { label: 'GitHub', href: profile.socials.github, Icon: GitHubIcon },
  { label: 'LinkedIn', href: profile.socials.linkedin, Icon: LinkedInIcon },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: MailIcon },
];

export default function SocialLinks({ size = 'md', className = '' }) {
  const iconSize = size === 'sm' ? 18 : 20;

  return (
    <ul className={`${styles.list} ${styles[size]} ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <Icon size={iconSize} />
          </a>
        </li>
      ))}
    </ul>
  );
}
