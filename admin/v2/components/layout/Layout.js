import React from 'react';
import Head from 'next/head';
import Header from 'components/layout/Header';
import CHeader from 'components/layout/CHeader';
import Footer from 'components/layout/Footer';
import useLocale from 'hooks/useLocale';
import { rtlLocales } from 'lib/lang';

export default function Layout({ title, children, header = true, footer = true, headerType, nocontainer }) {
  const { locale } = useLocale();
  const dir = rtlLocales.includes(locale) ? 'rtl' : 'ltr';

  return (
    <>
      <Head>
        <title>Horizon{title && ` - ${title}`}</title>
      </Head>

      {header && headerType === 'analysis' ? <Header /> : <CHeader />}

      <main className={nocontainer ? `` : `container`} dir={dir}>
        {children}
      </main>
      {footer && <Footer />}
      <div id="__modals" dir={dir} />
    </>
  );
}
