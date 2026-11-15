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
          <span className={styles.kw}>const</span> <span className={styles.var}>developer</span> = {'{'}
          {'\n'}  name: <span className={styles.str}>&apos;{profile.name}&apos;</span>,
          {'\n'}  role: <span className={styles.str}>&apos;{profile.roles[0]}&apos;</span>,
          {'\n'}  stack: [<span className={styles.str}>&apos;React&apos;</span>, <span className={styles.str}>&apos;JS&apos;</span>, <span className={styles.str}>&apos;CSS&apos;</span>],
          {'\n'}  passion: <span className={styles.str}>&apos;Beautiful UI&apos;</span>,
          {'\n'}  coffee: <span className={styles.num}>Infinity</span>,
          {'\n'}  <span className={styles.fn}>build</span>() {'{'}
          {'\n'}    <span className={styles.kw}>return</span> <span className={styles.str}>&apos;something great&apos;</span>;
          {'\n'}  {'}'},
          {'\n'}{'}'};
        </code>
      </pre>
    </div>
  );
}
