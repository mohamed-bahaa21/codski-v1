import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import Link from 'components/common/Link';
import Table from 'components/common/Table';
import Button from 'components/common/Button';
import PageHeader from 'components/layout/PageHeader';
import Modal from 'components/common/Modal';
import BlogEditForm from 'components/forms/BlogEditForm';
import ResetForm from 'components/forms/ResetForm';
import DeleteForm from 'components/forms/DeleteForm';
import TrackingCodeForm from 'components/forms/TrackingCodeForm';
import ShareUrlForm from 'components/forms/ShareUrlForm';
import EmptyPlaceholder from 'components/common/EmptyPlaceholder';
import ButtonLayout from 'components/layout/ButtonLayout';
import Toast from 'components/common/Toast';
import Favicon from 'components/common/Favicon';
import Pen from 'assets/pen.svg';
import Trash from 'assets/trash.svg';
import Reset from 'assets/redo.svg';
import Plus from 'assets/plus.svg';
import Code from 'assets/code.svg';
import LinkIcon from 'assets/link.svg';
import useFetch from 'hooks/useFetch';

import SERVER_URI from ".server.env";
import styles from './NewsPage.module.css';

export default function BrandsPage() {
  const [editBlog, setEditBlog] = useState();
  const [deleteBlog, setDeleteBlog] = useState();
  const [addBlog, setAddBlog] = useState();

  const [saved, setSaved] = useState(0);
  const [message, setMessage] = useState();

  const { data } = useFetch(`${SERVER_URI}/api/getBlogsData`, {}, [saved]);

  const Buttons = row => (
    <ButtonLayout align="right">
      <Button icon={<Pen />} size="small" onClick={() => setEditBlog(row)}>
        <FormattedMessage id="label.edit" defaultMessage="Edit" />
      </Button>
      <Button icon={<Trash />} size="small" onClick={() => setDeleteBlog(row)} disabled>
        <FormattedMessage id="label.delete" defaultMessage="Delete" />
      </Button>
    </ButtonLayout>
  );

  const DetailsLink = ({ content, url, title }) => (
    <Link href={`/news/${content}`} as={`/news/${content}`}>
      {title}
    </Link>
  );

  const columns = [
    {
      key: 'title',
      label: <FormattedMessage id="label.title" defaultMessage="title" />,
      className: 'col-6 col-xl-4',
      render: DetailsLink,
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
    setAddBlog(null);
    setEditBlog(null);
    setDeleteBlog(null);
  }

  if (!data) {
    return null;
  }

  const empty = (
    <EmptyPlaceholder
      msg={
        <FormattedMessage
          id="message.no-blogs-added"
          defaultMessage="You don't have any news."
        />
      }
    >
      <Button icon={<Plus />} size="medium" onClick={() => setAddBlog(true)} disabled>
        <FormattedMessage id="label.add-blog" defaultMessage="Add Blog" />
      </Button>
    </EmptyPlaceholder>
  );

  return (
    <>
      <PageHeader>
        <div>
          <b><FormattedMessage id="label.blogs" defaultMessage={`News`} /></b>
          <span style={{ backgroundColor: '#D39529', margin: '0.5rem', padding: '0.25rem 0.5rem', color: 'white', borderRadius: '0.25rem' }}>{data.length}</span>
          {/* <span style={{ fontSize: '2em' }}> / </span> */}
          <span style={{ backgroundColor: '#d32929', padding: '0.25rem 0.5rem', color: 'white', borderRadius: '0.25rem' }}>Maximum Reached</span>
        </div>
        <Button icon={<Plus />} size="small" onClick={() => setAddBlog(true)} disabled>
          <FormattedMessage id="label.add-blog" defaultMessage="Add Blog" />
        </Button>
      </PageHeader>

      <Table columns={columns} rows={data} empty={empty} />

      {editBlog && (
        <Modal title={<FormattedMessage id="label.edit-blog" defaultMessage="Edit Blog Meta" />}>
          {console.log('Edit Blog: ', editBlog)}
          <BlogEditForm values={editBlog} onSave={handleSave} onClose={handleClose} />
        </Modal>
      )}
      {addBlog && (
        <Modal title={<FormattedMessage id="label.add-blog" defaultMessage="Add Blog Meta" />}>
          <BlogEditForm onSave={handleSave} onClose={handleClose} />
        </Modal>
      )}
      {deleteBlog && (
        <Modal
          title={<FormattedMessage id="label.delete-blog" defaultMessage="Delete Blog" />}
        >
          <DeleteForm
            values={{ type: 'blog', blog_url: deleteBlog.blog_url, title: deleteBlog.title }}
            onSave={handleSave}
            onClose={handleClose}
          />
        </Modal>
      )}
      {message && <Toast message={message} onClose={() => setMessage(null)} />}
    </>
  );
}
