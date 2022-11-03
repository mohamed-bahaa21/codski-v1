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
import Checkbox from 'components/common/Checkbox';
import { DOMAIN_REGEX } from 'lib/constants';
import usePost from 'hooks/usePost';

const initialValues = {
  name: '',
  index: '',
  public: false,
};

const validate = ({ name, index }) => {
  const errors = {};

  if (!name) {
    errors.name = <FormattedMessage id="label.required" defaultMessage="Required" />;
  }
  if (!index) {
    errors.index = <FormattedMessage id="label.required" defaultMessage="Required" />;
  } else if (!DOMAIN_REGEX.test(index)) {
    errors.index = <FormattedMessage id="label.invalid-index" defaultMessage="Invalid index" />;
  }

  return errors;
};

export default function SectionEditForm({ values, onSave, onClose }) {
  const post = usePost();
  const [message, setMessage] = useState();

  const handleSubmit = async values => {
    console.log('Values: ', values);
    // const { ok, data } = await post('http://localhost:5000/api/sectionsIndex', values);

    // if (ok) {
    //   onSave();
    // } else {
    //   setMessage(
    //     data || <FormattedMessage id="message.failure" defaultMessage="Something went wrong." />,
    //   );
    // }
  };

  return (
    <FormLayout>
      <Formik
        initialValues={{ ...initialValues, ...values }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <FormRow>
              <label htmlFor="name">
                <FormattedMessage id="label.name" defaultMessage="Name" />
              </label>
              <div>
                <Field name="name" type="text" />
                <FormError name="name" />
              </div>
            </FormRow>
            <FormRow>
              <label htmlFor="index">
                <FormattedMessage id="label.index" defaultMessage="Index" />
              </label>
              <div>
                <Field name="index" type="text" placeholder="example.com" />
                <FormError name="index" />
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
