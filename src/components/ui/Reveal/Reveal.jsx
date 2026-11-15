import React, { useState } from 'react';
import { useInView } from 'hooks';
import styles from './Reveal.module.css';

export default function Reveal({
  as: Component = 'div',
  delay = 0,
  className = '',
  style,
  onTransitionEnd,
  children,
  ...props
}) {
  const [ref, inView] = useInView({ threshold: 0.12 });
  const [settled, setSettled] = useState(false);

  const handleTransitionEnd = (event) => {
    if (event.target === event.currentTarget && inView) setSettled(true);
    onTransitionEnd?.(event);
  };

  const revealStyle = inView && !settled ? { transitionDelay: `${delay}ms`, ...style } : style;

  return (
    <Component
      ref={ref}
      className={`${styles.reveal} ${inView ? styles.visible : ''} ${className}`}
      style={revealStyle}
      onTransitionEnd={handleTransitionEnd}
      {...props}
    >
      {children}
    </Component>
  );
}
