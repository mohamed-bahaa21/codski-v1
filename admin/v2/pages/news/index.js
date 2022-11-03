import React, { useState } from 'react';
import useFetch from 'hooks/useFetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/layout/Layout';
import NewsPage from 'components/pages/NewsPage';
import useRequireLogin from 'hooks/useRequireLogin';

import SERVER_URI from ".server.env";

import styles from 'styles/Home.module.css';

// 'getBlogsData'
// 'getBlogsCount'
// 'createNewBlogData'
// 'getBlogData/:blogId'
// 'editBlogMetaData'
// 'editBlogContentData'
// 'deleteBlogData'

export default function News() {
    const [blogs, setBlogs] = useState([]);

    let NewsEditor;
    if (typeof window !== "undefined") {
        NewsEditor = dynamic(() => import('components/pages/NewsEditor'));
    }

    // const { data } = useFetch(`${SERVER_URI}/api/getBlogsData`, {
    //     onDataLoad: data => {
    //         setBlogs(data)
    //     },
    // });

    // const { loading } = useRequireLogin();

    // if (loading) {
    //     return null;
    // }

    // if (data) {
    //     console.log("GET: ", data);
    // }

    return (
        <Layout headerType={`content`}>
            <div className={styles.container}>
                <Head>
                    <title>Horizon Admin</title>
                    <meta name="description" content="Horizon Admin" />
                    <link rel="icon" href="/favicon.png" />
                </Head>

                <main className={styles.main}>
                    <h1 className={styles.title}>
                        <span className={styles.orange}>Latest News</span>
                    </h1>

                    <a href="/" className={styles.card}>
                        <h2>&larr; Home</h2>
                    </a>
                </main>

                <NewsPage />
            </div>
        </Layout>
    )
}