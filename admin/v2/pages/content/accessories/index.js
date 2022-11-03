import React, { useState } from 'react';
import useFetch from 'hooks/useFetch';
import dynamic from 'next/dynamic';

import SERVER_URI from ".server.env";

export default function Accessories() {
    const [blocks, setBlocks] = useState(null);

    let ContentEditor;
    if (typeof window !== "undefined") {
        ContentEditor = dynamic(() => import('components/pages/ContentEditor'));
    }

    const { data } = useFetch(`${SERVER_URI}/api/getAccessoriesData`, {
        onDataLoad: data => {
            console.log("GET: ", data);
            setBlocks(data.blocks)
        },
    });

    return (
        <div>
            {ContentEditor && (blocks != null) &&
                <ContentEditor blocks={blocks} postUrl={`${SERVER_URI}/api/postAccessoriesData`} />
            }
        </div>
    )
}