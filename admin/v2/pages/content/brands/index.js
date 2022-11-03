import React, { useState } from 'react';
import useFetch from 'hooks/useFetch';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Layout from 'components/layout/Layout';
import BrandsPage from 'components/pages/BrandsPage';
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

export default function Brands() {
    const [blogs, setBlogs] = useState([]);

    let BrandsEditor;
    if (typeof window !== "undefined") {
        BrandsEditor = dynamic(() => import('components/pages/BrandsEditor'));
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
                        <span className={styles.orange}>Brands</span>
                    </h1>

                    <a href="/" className={styles.card}>
                        <h2>&larr; Home</h2>
                    </a>
                </main>

                <BrandsPage />
            </div>
        </Layout>
    )
}