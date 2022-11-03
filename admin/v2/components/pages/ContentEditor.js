import React, { useState } from 'react';
import usePost from 'hooks/usePost';
import { FormattedMessage } from 'react-intl';
import Toast from 'components/common/Toast';
import Layout from 'components/layout/Layout';
import { createReactEditorJS } from "react-editor-js";
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
import Button from 'components/common/Button';
import EditorJS from "@editorjs/editorjs";
import Paragraph from '@editorjs/paragraph'
import Image from '@editorjs/image'

import SERVER_URI from ".server.env";

import styles from 'styles/Home.module.css';

const EDITOR_JS_TOOLS = {
    header: Header,
    linkTool: LinkTool,
    quote: Quote,
    marker: Marker,
    image: SimpleImage,
    raw: Raw,
    list: List,
    checklist: CheckList,
    table: Table,
    embed: Embed,
    warning: Warning,
    code: Code,
    inlineCode: InlineCode,
    delimiter: Delimiter,
};

export default function ContentEditor(blocks) {
    const [disabled, setDisabled] = useState(true)
    const [saved, setSaved] = useState(0);
    const [message, setMessage] = useState();
    const post = usePost();

    const EditorJSComp = createReactEditorJS()
    const editorJS = React.useRef(null);

    const handleInitialize = React.useCallback((instance) => {
        editorJS.current = instance
    }, []);

    function onSave() {
        setSaved(state => state + 1);
        setMessage(<FormattedMessage id="message.save-success" defaultMessage="Saved successfully." />);
    }

    const handleSave = React.useCallback(async () => {
        const savedData = await editorJS.current.save();
        // console.log('POST_URL: ', blocks.postUrl)
        console.log('POST: ', savedData.blocks)
        const { ok, data } = await post(blocks.postUrl, savedData.blocks);

        if (ok) {
            onSave();
        } else {
            setMessage(data || <FormattedMessage id="message.failure" defaultMessage="Something went wrong." />);
        }
    }, []);

    return (
        <>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    <span className={styles.orange}>Content Management</span>
                </h1>

                <div className={styles.grid}>
                    <a href="/" className={styles.card}>
                        <h2>&larr; Home</h2>
                    </a>

                    <a href="/content" className={styles.card}>
                        <h2>&larr; Content Management</h2>
                    </a>
                </div>
            </main>

            {disabled ? (
                <Button type="submit" disabled>
                    <FormattedMessage id="label.edit-blog-content" defaultMessage="Edit Blog Content" />
                </Button>
            ) : (
                <Button
                    type="submit" onClick={handleSave}
                    className={`${styles.btn}`}
                    disabled={disabled}>
                    <FormattedMessage id="label.edit-blog-content" defaultMessage="Edit Blog Content" />
                </Button>
            )}

            <EditorJSComp
                onInitialize={handleInitialize}
                defaultValue={blocks}
                holder='editor'
                tools={EDITOR_JS_TOOLS}
                readOnly={false}
                onChange={() => {
                    setDisabled(false)
                    console.log("editor changed...");
                }}
            >
                <div id="editor" />
            </EditorJSComp>

            {message && <Toast message={message} onClose={() => setMessage(null)} />}

            {/* <EditorJSComp
                tools={EDITOR_JS_TOOLS}
                defaultValue={data}
                readOnly={false}
            /> */}
        </>
    );

    // const editor = new EditorJS({
    //     holder: 'editor',
    //     tools: EDITOR_JS_TOOLS,
    //     data: blocks,
    //     readOnly: false,
    //     onChange: () => {
    //         setDisabled(false)
    //         console.log("editor changed...");
    //     }
    // });

    // const postBlocks = () => {
    //     editor.save().then(async (outputData) => {
    //         console.log('POST: ', outputData.blocks)
    //         // const { ok, data } = await post(`${SERVER_URI}/api/editorjs`, outputData.blocks);

    //         // if (ok) {
    //         //     console.log("Submited correctly");
    //         // } else {
    //         //     console.log("Something went wrong submiting");
    //         // }
    //     }).catch((error) => {
    //         console.log('Saving failed: ', error)
    //     });
    // }

    // const editorJS = React.useRef(null);
    // const editor = new EditorJS();

    // const handleInitialize = React.useCallback((instance) => {
    //     editorJS.current = instance
    //     console.log("data: ", editorJS.current);
    // }, [])

    // const handleSave = React.useCallback(() => {
    //     const savedData = editorJS.current.save();
    // }, [])

    // const changeEditor = () => {
    //     editor.save().then((outputData) => {
    //         console.log('Article data: ', outputData)
    //     }).catch((error) => {
    //         console.log('Saving failed: ', error)
    //     });
    // }

    // EditorJS.save().then((outputData) => {
    //     console.log('New data: ', outputData)
    // }).catch((error) => {
    //     console.log('Saving failed: ', error)
    // });
}