import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Page from 'components/layout/Page';
import MenuLayout from 'components/layout/MenuLayout';
import CSections from './CSections';
import { useSelector } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import CSeo from 'components/forms/CSeo';



export default function SeoPage({
  page_id,
  formFieldsName,
  formFields,
  formFieldsType,
  init_formFieldsValues,
  getLink,
  postLink
}) {
  const user = useSelector(state => state.user);
  const router = useRouter();
  const { pathname } = router;

  return (
    <Page>
      <CSeo
        page_id={page_id}
        formFieldsName={formFieldsName}
        formFields={formFields}
        formFieldsType={formFieldsType}
        init_formFieldsValues={init_formFieldsValues}
        getLink={getLink}
        postLink={postLink}
      />
    </Page>
  );
}
