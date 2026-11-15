import React from 'react';
import styles from './Button.module.css';

export default function Button({
  as = 'a',
  variant = 'primary',
  icon,
  children,
  className = '',
  ...props
}) {
  const Component = as;
  const isExternal = Component === 'a' && typeof props.href === 'string' && props.href.startsWith('http');

  return (
    <Component
      className={`${styles.button} ${styles[variant]} ${className}`}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      <span>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </Component>
  );
}
