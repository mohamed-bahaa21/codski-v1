import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/layout/Layout';
import WebsiteList from 'components/pages/WebsiteList';
import WebsiteDetails from 'components/pages/WebsiteDetails';
import useRequireLogin from 'hooks/useRequireLogin';
import styles from 'styles/Home.module.css';

export default function DashboardPage() {
  const { loading } = useRequireLogin();
  // const router = useRouter();
  // const { id } = router.query;
  // const userId = id?.[0];

  if (loading) {
    return null;
  }

  // const [websiteId] = id;

  return (
    <div>
      <Layout headerType={`analysis`}>
        {/* <main className={styles.main}> */}
        <h1 className={styles.title}>
          Analysis <span className={styles.orange}>Dashboard</span>
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

        {/* <WebsiteList userId={userId} /> */}
        <WebsiteDetails websiteId={`1`} />
      </Layout>
    </div>
  );
}
