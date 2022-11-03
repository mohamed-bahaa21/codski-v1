import React, { Component } from "react";
import Image from 'next/image'
import axios from "axios";
import Layout from 'components/layout/Layout';

import styles from 'styles/Home.module.css';

import SERVER_URI from ".server.env";
import UploadImg from "components/helpers/UploadImg";

class Gallery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: "...",
            copied: false,
            imgs: [],
        };
    }

    getGallery = () => {
        axios
            .get(`${SERVER_URI}/api/gallery`)
            .then((response) => {
                const gallery = response.data;
                let lista = [];
                console.log(gallery[0]);

                gallery.map((img) => {
                    lista.push(img);
                    return lista;
                });

                this.setState({
                    imgs: lista,
                });

                console.log(this.state.imgs);
            })

            .catch((error) => {
                console.log(error);
            });
    };

    copyToCLip = (e) => {
        this.setState({
            copied: true,
        });

        const url = e.target.id;
        navigator.clipboard.writeText(url);

        console.log("====================================");
        console.log("URL: ", url);
        console.log("copied: ", this.state.copied);
        console.log("====================================");
    };

    componentDidMount() {
        this.getGallery();
    }

    render() {
        const listImgs = this.state.imgs.map((img) => (
            <img
                key={img._id}
                id={img.img_url}
                src={img.img_url}
                onClick={this.copyToCLip}
            />
        ));
        return (
            <Layout headerType={`content`}>
                <div className={styles.flex}>
                    <a href="/" className={styles.card}>
                        <h2>&larr; Home</h2>
                    </a>
                </div>
                <ul>
                    <li><b>click 2 copy</b> is working, still to show the tooltip & the flash message.</li>
                    <li><b>click 2 open</b> to be added.</li>
                    <li>styling the button.</li>
                </ul>
                <UploadImg />
                <br /><hr />
                <div className={styles.gallery}>
                    {this.state.edited === true ? (
                        <div>
                            <strong>Uploaded</strong> Successfully...
                        </div>
                    ) : (
                        <p></p>
                    )}
                    <div >
                        {listImgs}
                    </div>
                </div>
                <br /><hr />
            </Layout>
        );
    }
}

export default Gallery;
