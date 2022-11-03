import React, { useState } from 'react';
import { IntlProvider, FormattedMessage } from 'react-intl';
import Button from 'components/common/Button';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import { Formik, Form, Field } from 'formik';
import FormLayout, {
  FormButtons,
  FormError,
  FormMessage,
  FormRow,
} from 'components/layout/FormLayout';
import usePost from 'hooks/usePost';
import loginStyles from './CForm.module.css';

const validate = ({ name }) => {
  const errors = {};
  if (!name) {
    errors.name = <FormattedMessage id="label.required" defaultMessage="Required" />;
  }
  return errors;
};

export default function CSeoForm({
  formFieldsName,
  formFields,
  formFieldsType,
  initValues,
  values,
  postLink,
  onSave,
  onClose,
}) {
  // const [name, setName] = useState();
  const post = usePost();
  const [message, setMessage] = useState();
  const initialValues = initValues;

  const handleSubmit = async values => {
    // console.log('Submit: ', values);
    // const ok = true;

    const { ok, data } = await post(postLink, values);

    if (ok) {
      onSave();
    } else {
      setMessage(
        data || <FormattedMessage id="message.failure" defaultMessage="Something went wrong." />,
      );
    }
  };

  return (
    <FormLayout className={loginStyles.login}>
      <Formik initialValues={{ ...initialValues, ...values }} onSubmit={handleSubmit}>
        {/* before: 182 - 307 = 125 loc */}
        {/* after:  */}
        {() => (
          <Form>
            <FormButtons>
              <Button type="submit" variant="action">
                <FormattedMessage id="label.submit" defaultMessage="Submit" />
              </Button>
              {/* <Button onClick={onClose}>
                <FormattedMessage id="label.cancel" defaultMessage="Cancel" />
              </Button> */}
            </FormButtons>
            <FormMessage>{message}</FormMessage>
            <br />
            <Field
              name={`page_id`}
              type={`text`}
              disabled
              hidden
            />
            {
              formFields.map((field, index) => (
                <FormRow>
                  <label htmlFor={`${field}`}>
                    <FormattedMessage id={`label.${field}`} defaultMessage={`${formFieldsName[index]}`} />
                  </label>
                  <div>
                    <Field
                      name={`${field}`}
                      type={`${formFieldsType[index][1]}`}
                      as={`${formFieldsType[index][2]}`}
                    />
                    <FormError name={`${field}`} />
                  </div>
                </FormRow>
              ))
            }
          </Form>
        )}
      </Formik>
    </FormLayout >
  );
}