import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import Layout from 'components/layout/Layout';
import Table from 'components/common/Table';
import EmptyPlaceholder from 'components/common/EmptyPlaceholder';
import Button from 'components/common/Button';
import Plus from 'assets/plus.svg';
import { CSVLink } from "react-csv";
import axios from 'axios';

import styles from 'styles/Home.module.css';

import SERVER_URI from ".server.env";

class Mailing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mailingList: [],
            header: {
                label: "Email",
                key: 'email'
            }
        }
    }


    getMailList = () => {
        axios.get(`${SERVER_URI}/api/mailing-list`)
            .then(response => {

                const mailing_list = response.data
                let lista = []
                // console.log(mailing_list[0].mail_email);
                mailing_list.map(mail => {
                    lista.push(([mail.mail_email]))
                    return lista
                })

                this.setState({
                    mailingList: lista
                })
                // console.log(this.state.mailingList);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    componentDidMount() {
        this.getMailList()
    }

    render() {
        let tableItems = []
        this.state.mailingList.map(item => {
            let row = { "email": item }
            tableItems.push(row)
            return tableItems
        })

        const empty = (
            <EmptyPlaceholder
                msg={
                    <FormattedMessage
                        id="message.no-emails-submitted"
                        defaultMessage="No one submitted yet !"
                    />
                }
            >
            </EmptyPlaceholder>
        );

        return (
            <Layout headerType={`content`}>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        <span className={styles.orange}>Mailing List</span>
                    </h1>

                    <a href="/" className={styles.card}>
                        <h2>&larr; Home</h2>
                    </a>
                </main>

                <CSVLink className={`${styles.btn}`} data={this.state.mailingList} filename='Horizon_Mailing_List.csv'>
                    Download Mailing List
                </CSVLink>
                <br />
                <br />

                <div>
                    <div className={`${styles.card} ${styles.card100}`}>
                        <Table
                            columns={[{
                                key: 'email',
                                label: <FormattedMessage id="label.email" defaultMessage="Email" />,
                                className: 'col-12 col-xl-12',
                            }]}
                            rows={tableItems}
                            empty={empty}
                        />
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Mailing
