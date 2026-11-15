import React from 'react';
import { profile } from 'data';
import styles from './CodeWindow.module.css';

export default function CodeWindow() {
  return (
    <div className={styles.window}>
      <div className={styles.bar}>
        <span />
        <span />
        <span />
        <p>developer.js</p>
      </div>
      <pre className={styles.code}>
        <code>
          <span className={styles.kw}>const</span> <span className={styles.var}>developer</span> ={' '}
          {'{'}
          {'\n'} name: <span className={styles.str}>'{profile.name}'</span>,{'\n'} role:{' '}
          <span className={styles.str}>'{profile.roles[0]}'</span>,{'\n'} experience:{' '}
          <span className={styles.str}>'7+ years'</span>,{'\n'} stack: [
          <span className={styles.str}>'React'</span>, <span className={styles.str}>'Node.js'</span>
          , <span className={styles.str}>'Express.js'</span>,{' '}
          <span className={styles.str}>'MongoDB'</span>,{' '}
          <span className={styles.str}>'AI / LLMs'</span>],
          {'\n'} currentlyExploring:{' '}
          <span className={styles.str}>'Generative AI & Smart Web Workflows'</span>,{'\n'} fuel:{' '}
          {'{'} food: <span className={styles.num}>Infinity</span>, travel:{' '}
          <span className={styles.kw}>true</span> {'}'},{'\n'} {'\n  '}
          <span className={styles.fn}>build</span>() {'{'}
          {'\n    '}
          <span className={styles.kw}>return</span>{' '}
          <span className={styles.str}>'Scalable apps with clean UI'</span>;{'\n  }'},{'\n'}
          {'}'};
        </code>
      </pre>
    </div>
  );
}
