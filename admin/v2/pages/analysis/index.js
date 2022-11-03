import React from 'react';
import Head from 'next/head';
import Layout from 'components/layout/Layout';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import useLocale from 'hooks/useLocale';
import useForceSSL from 'hooks/useForceSSL';
import useRequireLogin from 'hooks/useRequireLogin';

import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import styles from 'styles/Home.module.css';

const Intl = ({ children }) => {
  const { locale, messages } = useLocale();
  const Wrapper = ({ children }) => <span className={locale}>{children}</span>;
  return (
    <IntlProvider locale={locale} messages={messages[locale]} textComponent={Wrapper}>
      {children}
    </IntlProvider>
  );
};

const analysis = ({ Component, pageProps }) => {
  useForceSSL(process.env.FORCE_SSL);
  const { loading } = useRequireLogin();
  const router = useRouter();
  const { basePath } = useRouter();
  const { id } = router.query;

  if (loading) {
    return null;
  }

  return (
    <Layout headerType={`content`}>
      <div className={styles.container}>
        <Head>
          <title>Horizon Admin</title>
          <meta name="description" content="Horizon Admin" />
          <link rel="icon" href="/favicon.png" />
        </Head>

        <Intl>
          <main className={styles.main}>
            <h1 className={styles.title}>
              <span className={styles.orange}>Analysis</span>
            </h1>

            <p className={styles.description}>
              <code className={styles.code}>where secrets become stories</code>
            </p>

            <a href="/" className={styles.card}>
              <h2>&larr; Home</h2>
            </a>

            <div className={styles.grid}>
              <a href="/analysis/dashboard" className={styles.card}>
                <h2>Dashboard &rarr;</h2>
              </a>
              <a href="/analysis/realtime" className={styles.card}>
                <h2>Real Time &rarr;</h2>
              </a>
            </div>
          </main>
        </Intl>
      </div>
    </Layout>
  );
};

export default analysis;
