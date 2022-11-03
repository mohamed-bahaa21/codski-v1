import React, { useState } from 'react';
import classNames from 'classnames';
import Link from 'components/common/Link';
import Table from 'components/common/Table';
import Button from 'components/common/Button';
import PageHeader from 'components/layout/PageHeader';
import { FormattedMessage } from 'react-intl';
import Modal from 'components/common/Modal';
import SectionEditForm from 'components/forms/SectionEditForm';
import DeleteForm from 'components/forms/DeleteForm';
import EmptyPlaceholder from 'components/common/EmptyPlaceholder';
import ButtonLayout from 'components/layout/ButtonLayout';
import Toast from 'components/common/Toast';
import Pen from 'assets/pen.svg';
import Trash from 'assets/trash.svg';
import Plus from 'assets/plus.svg';
import styles from './CSections.module.css';

export default function CSections() {
  const [editSection, setEditSection] = useState();
  const [deleteSection, setDeleteSection] = useState();
  const [saved, setSaved] = useState(0);
  const [message, setMessage] = useState();
  // const { data } = useFetch(`http://localhost:5000/api/getHeroData`, {}, [saved]);
  const data = [
    {
      name: 'Hero Section',
      index: 0,
    },
  ];

  const Buttons = row => (
    <ButtonLayout align="right">
      <Button icon={<Pen />} size="small" onClick={() => setEditSection(row)}>
        <FormattedMessage id="label.edit" defaultMessage="Edit" />
      </Button>
      <Button icon={<Trash />} size="small" onClick={() => setDeleteSection(row)}>
        <FormattedMessage id="label.delete" defaultMessage="Delete" />
      </Button>
    </ButtonLayout>
  );

  const columns = [
    {
      key: 'name',
      label: <FormattedMessage id="label.name" defaultMessage="Name" />,
      className: 'col-6 col-xl-4',
    },
    {
      key: 'index',
      label: <FormattedMessage id="label.index" defaultMessage="index" />,
      className: 'col-6 col-xl-4',
    },
    {
      key: 'action',
      className: classNames(styles.buttons, 'col-12 col-xl-4 pt-2 pt-xl-0'),
      render: Buttons,
    },
  ];

  function handleSave() {
    setSaved(state => state + 1);
    setMessage(<FormattedMessage id="message.save-success" defaultMessage="Saved successfully." />);
    handleClose();
  }

  function handleClose() {
    setEditSection(null);
    setDeleteSection(null);
  }

  if (!data) {
    return null;
  }

  const empty = (
    <EmptyPlaceholder
      msg={
        <FormattedMessage
          id="message.no-sections-configured"
          defaultMessage="You don't have any section."
        />
      }
    >
      <Button icon={<Plus />} size="medium" onClick={() => setEditSection(true)}>
        <FormattedMessage id="label.edit-section" defaultMessage="Edit section" />
      </Button>
    </EmptyPlaceholder>
  );

  return (
    <>
      <PageHeader>
        <div>
          <FormattedMessage id="label.sections" defaultMessage="Sections" />
        </div>
      </PageHeader>

      <Table columns={columns} rows={data} empty={empty} />

      {editSection && (
        <Modal title={<FormattedMessage id="label.edit-section" defaultMessage="Edit section" />}>
          <SectionEditForm values={editSection} onSave={handleSave} onClose={handleClose} />
        </Modal>
      )}

      {deleteSection && (
        <Modal
          title={<FormattedMessage id="label.delete-section" defaultMessage="Delete section" />}
        >
          <DeleteForm
            values={{ type: 'section', id: deleteSection.section_id, name: deleteSection.name }}
            onSave={handleSave}
            onClose={handleClose}
          />
        </Modal>
      )}
      {message && <Toast message={message} onClose={() => setMessage(null)} />}
    </>
  );
}
