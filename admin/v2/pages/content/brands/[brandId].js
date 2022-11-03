import React, { useState } from 'react';
import { useRouter } from "next/router"
import useFetch from 'hooks/useFetch';
import dynamic from 'next/dynamic';
import Layout from 'components/layout/Layout';

import SERVER_URI from ".server.env";

export default function News() {
    const router = useRouter();
    const { query: { articleId } } = router;
    console.log("ArticleID: ", articleId);

    const [blocks, setBlocks] = useState(null);

    let NewsEditor;
    if (typeof window !== "undefined") {
        NewsEditor = dynamic(() => import('components/pages/NewsEditor'));
    }

    const { data } = useFetch(`${SERVER_URI}/api/getBlogContentData/${articleId}`, {
        onDataLoad: data => {
            console.log("GET: ", data);
            setBlocks(data.blocks)
        },
    });

    return (
        <Layout headerType={`content`}>
            {NewsEditor && (blocks != null) &&
                <NewsEditor blocks={blocks} postUrl={`${SERVER_URI}/api/editBlogContentData/${articleId}`} /> || <h1>no data</h1>
            }
        </Layout>
    )
}