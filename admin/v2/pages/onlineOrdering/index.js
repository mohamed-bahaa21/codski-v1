import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl';
import Layout from 'components/layout/Layout';
import OnlineOrderingTable from 'components/common/OnlineOrderingTable';
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
            view: 'table',
            header: {
                label: "Email",
                key: 'email'
            },
        }
    }


    getMailList = () => {
        axios.get(`${SERVER_URI}/api/online-ordering`)
            .then(response => {
                const mailing_list = response.data
                let lista = []

                mailing_list.map(mail => {
                    lista.push(mail)
                    return lista
                })

                this.setState({
                    mailingList: lista
                })
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
            console.log(item.email);
            let row = {
                "email": item.email,
                name: item.name,
                phone: item.phone,
                message: item.message
            }
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
                        <span className={styles.orange}>Online Ordering</span>
                    </h1>

                    <a href="/" className={styles.card}>
                        <h2>&larr; Home</h2>
                    </a>
                </main>
                <div>
                    <div className={`${styles.card} ${styles.card100}`}>
                        <OnlineOrderingTable
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
