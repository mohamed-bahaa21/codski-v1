import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Formik, Form, Field } from 'formik';
import Button from 'components/common/Button';
import FormLayout, {
  FormButtons,
  FormError,
  FormMessage,
  FormRow,
} from 'components/layout/FormLayout';
import Icon from 'components/common/Icon';
import Check from 'assets/check.svg';
import FieldCheckbox from 'components/common/FieldCheckbox';
import { DOMAIN_REGEX } from 'lib/constants';

import SERVER_URI from ".server.env";
import usePost from 'hooks/usePost';

import styles from "./BlogEditForm.module.css"

const initialValues = {
  title: '',
};

const validate = ({ title }) => {
  const errors = {};

  if (!title) {
    errors.title = <FormattedMessage id="label.required" defaultMessage="Required" />;
  }

  return errors;
};

export default function BlogEditForm({ values, onSave, onClose }) {
  const post = usePost();
  const [message, setMessage] = useState();

  const handleSubmit = async values => {
    // const ok = true;
    // console.log('blog EditForm values: ', values);
    const { ok, data } = await post(`${SERVER_URI}/api/createNewBlogData`, values);

    if (ok) {
      onSave();
    } else {
      setMessage(
        data || <FormattedMessage id="message.failure" defaultMessage="Something went wrong." />,
      );
    }
  };

  return (
    <FormLayout>
      <Formik
        initialValues={{ ...initialValues, ...values, enable_share_url: !!values?.share_id }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            {/* published */}
            {/* <FormRow>
              <label htmlFor="published">
                <FormattedMessage id="label.published" defaultMessage="published" />
              </label>

              <div>
                <Field name="published" type="checkbox" defaultValue={false} />
                <FormError name="published" />
              </div>

            </FormRow> */}

            {/* title */}
            <FormRow>
              <label htmlFor="title">
                <FormattedMessage id="label.title" defaultMessage="Title" />
              </label>
              <div>
                <Field name="title" type="text" />
                <FormError name="title" />
              </div>
            </FormRow>

            {/* summary */}
            <FormRow>
              <label htmlFor="summary">
                <FormattedMessage id="label.summary" defaultMessage="Summary" />
              </label>
              <div>
                <Field name="summary" type="text" as="textarea" />
                <FormError name="summary" />
              </div>
            </FormRow>

            {/* thumb_img */}
            <FormRow>
              <label htmlFor="thumb_img">
                <FormattedMessage id="label.thumb_img" defaultMessage="Thumb Img" />
              </label>
              <div>
                <Field name="thumb_img" type="text" as="textarea" />
                <FormError name="thumb_img" />
              </div>
            </FormRow>

            {/* main_img */}
            <FormRow>
              <label htmlFor="main_img">
                <FormattedMessage id="label.main_img" defaultMessage="Main Img" />
              </label>
              <div>
                <Field name="main_img" type="text" as="textarea" />
                <FormError name="main_img" />
              </div>
            </FormRow>

            <FormButtons>
              <Button type="submit" variant="action">
                <FormattedMessage id="label.save" defaultMessage="Save" />
              </Button>
              <Button onClick={onClose}>
                <FormattedMessage id="label.cancel" defaultMessage="Cancel" />
              </Button>
            </FormButtons>
            <FormMessage>{message}</FormMessage>
          </Form>
        )}
      </Formik>
    </FormLayout>
  );
}
