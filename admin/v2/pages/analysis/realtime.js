import React from 'react';
import Layout from 'components/layout/Layout';
import RealtimeDashboard from 'components/pages/RealtimeDashboard';
import useRequireLogin from 'hooks/useRequireLogin';
import styles from 'styles/Home.module.css';

export default function RealtimePage() {
  const { loading } = useRequireLogin();

  if (loading) {
    return null;
  }

  return (
    <div>
      <Layout headerType={`analysis`}>
        {/* <main className={styles.main}> */}
        <h1 className={styles.title}>
          Analysis <span className={styles.orange}>Realtime</span>
        </h1>

        <div className={styles.flex}>
          <a href="/" className={styles.card}>
            <h2>&larr; Home</h2>
          </a>

          <a href="/analysis" className={styles.card}>
            <h2>&larr; Analysis</h2>
          </a>
        </div>
        {/* </main> */}
        <RealtimeDashboard />
      </Layout>
    </div>
  );
}
