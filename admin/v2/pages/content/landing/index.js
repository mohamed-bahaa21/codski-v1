import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import useLocale from 'hooks/useLocale';
import useForceSSL from 'hooks/useForceSSL';
import useRequireLogin from 'hooks/useRequireLogin';

import Layout from 'components/layout/Layout';
import ContentPage from 'components/pages/ContentPage';
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

export default function content() {
  useForceSSL(process.env.FORCE_SSL);
  const { loading } = useRequireLogin();
  const router = useRouter();
  const { basePath } = useRouter();
  const { id } = router.query;

  if (loading) {
    return null;
  }

  return (
    <Layout headerType={`content`} nocontainer>
      <div className={styles.flex}>
        <a href="/" className={styles.card}>
          <h2>&larr; Home</h2>
        </a>

        <a href="/content" className={styles.card}>
          <h2>&larr; Content</h2>
        </a>
      </div>
      <ContentPage />
    </Layout>
  );
}
