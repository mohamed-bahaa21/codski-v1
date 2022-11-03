import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useRequireLogin from 'hooks/useRequireLogin';
import Layout from 'components/layout/Layout';
import styles from 'styles/Home.module.css';
import Footer from 'components/layout/Footer';
import axios from 'axios';

import CHAT_URI from ".chat.env";

export default function Home() {
  const { loading } = useRequireLogin();
  const router = useRouter();
  const { id } = router.query;
  const [unread, setUnread] = useState(false);

  if (loading) {
    return null;
  }

  axios.get(`${CHAT_URI}/api/getUnread`)
    .then(response => {
      setUnread(response.data.unread)
      console.log("unread: ", unread);
    })
    .catch((error) => {
      console.log(error);
    })

  return (
    <Layout headerType={`content`}>
      {/* <div className={styles.container}> */}
      <Head>
        <title>Horizon Admin</title>
        <meta name="description" content="Horizon Admin" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome <span className={styles.orange}>Horizon</span>
        </h1>
      </main>
      {/* <p className={styles.description}>
          <code className={styles.code}>Here, where magic happens</code>
        </p> */}

      <div className={styles.grid}>
        <a href="/content" className={styles.card}>
          <h2>Content Management &rarr; </h2>
          {/* <p>Where changing content doesn't need a Developer</p> */}
        </a>

        <a href="/seo" className={styles.card}>
          <h2>SEO &rarr; </h2>
          {/* <p>Search Engines can't exist without Optimization.</p> */}
        </a>

        <a href="/news" className={styles.card}>
          <h2>Latest News &rarr; </h2>
          {/* <p>Last news is important.</p> */}
        </a>

        <a href="/analysis" className={styles.card}>
          <h2>Analysis &rarr; </h2>
          {/* <p>where secrets become stories.</p> */}
        </a>

        <a href="/mailing" className={styles.card}>
          <h2>Mailing List &rarr; </h2>
          {/* <p>Send important messages.</p> */}
        </a>

        <a href="/onlineOrdering" className={styles.card}>
          <h2>Online Ordering &rarr; </h2>
          {/* <p>Who ordered your product.</p> */}
        </a>

        <a href="/chat" className={styles.card} style={unread ? { backgroundColor: 'rgb(211 149 41)', color: 'white' } : {}}>
          <h2>Chat &rarr; </h2>
          {/* <p>Keep no distance from your customers.</p> */}
        </a>

        <a href="/gallery" className={styles.card}>
          <h2>Gallery &rarr; </h2>
          {/* <p>your photo collection.</p> */}
        </a>
      </div>

      <div className={styles.grid}>
      </div>
      {/* </div> */}
    </Layout>
  );
}
