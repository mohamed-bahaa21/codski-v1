import React, { useState } from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import useLocale from 'hooks/useLocale';
import useFetch from 'hooks/useFetch';
import Button from 'components/common/Button';
import PageHeader from 'components/layout/PageHeader';
import Toast from 'components/common/Toast';
import Pen from 'assets/pen.svg';
import EmptyPlaceholder from 'components/common/EmptyPlaceholder';
import Modal from 'components/common/Modal';
import CSeoForm from './CSeoForm';

import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';

const Intl = ({ children }) => {
  const { locale, messages } = useLocale();
  const Wrapper = ({ children }) => <span className={locale}>{children}</span>;
  return (
    <IntlProvider locale={locale} messages={messages[locale]} textComponent={Wrapper}>
      {children}
    </IntlProvider>
  );
};

export default function CSeo({
  page_id,
  formFieldsName,
  formFields,
  formFieldsType,
  init_formFieldsValues,
  getLink,
  postLink,
}) {
  const [editSection, setEditSection] = useState();
  const [seoValues, setSeoValues] = useState();
  const [message, setMessage] = useState();
  const [saved, setSaved] = useState(0);
  console.log(getLink);
  const { data } = useFetch(
    getLink,
    {
      onDataLoad: data => {
        console.log("Data: ", data);
        setSeoValues({
          page_id: page_id,
          ...data
        });
        setEditSection(true)
        setMessage('Data loaded successfully !')
      },
    },
    [saved],
  );

  function handleSave() {
    setSaved(state => state + 1);
    setMessage(<FormattedMessage id="message.save-success" defaultMessage="Saved successfully." />);
    handleClose();
  }

  function handleClose() {
    setEditSection(null);
  }

  if (!data) {
    return null;
  }

  const empty = (
    <EmptyPlaceholder
      msg={
        <FormattedMessage
          id="message.no-websites-configured"
          defaultMessage="You don't have any websites configured."
        />
      }
    ></EmptyPlaceholder>
  );
  return (
    <>
      <PageHeader>
        <div>
          <FormattedMessage id={`label.${page_id}`} defaultMessage={`${page_id}`} />
        </div>
        {/* <Button
          icon={<Pen />}
          size="small"
          onClick={() => (editSection ? setEditSection(false) : setEditSection(true))}
        >
          <FormattedMessage id="label.edit" defaultMessage="Edit" />
        </Button> */}
      </PageHeader>

      {/* <Table columns={columns} rows={data} empty={empty} /> */}

      {editSection && (
        <div>
          {/* <Modal title={<FormattedMessage id="label.edit-website" defaultMessage="Edit section" />}> */}
          {/* {console.log("seoValues: ", seoValues)} */}
          <CSeoForm
            formFieldsName={formFieldsName}
            formFields={formFields}
            formFieldsType={formFieldsType}
            initValues={init_formFieldsValues}
            values={seoValues}
            postLink={postLink}
            onSave={handleSave}
            onClose={handleClose}
          />
          {/* </Modal> */}
        </div>
      )}
      {message && <Toast message={message} onClose={() => setMessage(null)} />}
    </>
  );
}
