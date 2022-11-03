import React from 'react';

import styles from 'styles/Home.module.css';

export default function Custom404() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          <span className={styles.orange}>404</span> Not Found
        </h1>

        <a href="/" className={styles.card}>
          <h2>Home</h2>
        </a>
      </main>
    </div>
  );
}
