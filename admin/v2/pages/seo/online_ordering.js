import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import useLocale from 'hooks/useLocale';
import useForceSSL from 'hooks/useForceSSL';
import useRequireLogin from 'hooks/useRequireLogin';

import Layout from 'components/layout/Layout';
import SeoPage from 'components/pages/SeoPage';
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

import seo from 'data/seo';

export default function landing() {
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

            <main className={styles.main}>
                <h1 className={styles.title}>
                    <span className={styles.orange}>SEO</span>
                </h1>

                <div className={styles.grid}>
                    <a href="/" className={styles.card}>
                        <h2>&larr; Home</h2>
                    </a>

                    <a href="/seo" className={styles.card}>
                        <h2>&larr; SEO</h2>
                    </a>
                </div>
            </main>
            <SeoPage
                sectionHeader="Online Ordering Page"
                page_id={seo.online_ordering.page_id}
                formFieldsName={seo.online_ordering.formFieldsName}
                formFields={seo.online_ordering.formFields}
                formFieldsType={seo.online_ordering.formFieldsType}
                init_formFieldsValues={seo.online_ordering.init_formFieldsValues}
                getLink={seo.online_ordering.getLink}
                postLink={seo.online_ordering.postLink}
            />
        </Layout>
    );
}
