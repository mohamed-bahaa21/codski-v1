import SERVER_URI from '.server.env';
import { wv } from './sectionsId';

export default {
  meta_formFields: ['section_index', 'section_name', 'section_display'],
  meta_formFieldsType: [
    ['section_index', 'number', 'input'],
    ['section_name', 'text', 'input'],
    ['section_display', 'checkbox', 'input'],
  ],
  meta_formFieldsValues: {
    section_index: 0,
    section_name: 'section name',
    section_display: true,
  },
  // ======================================================
  sectionID: wv,
  formFieldsName: [
    'Description',
    'Link',
  ],
  formFields: [
    'wv_desc',
    'wv_link',
  ],
  formFieldsType: [
    ['wv_desc', 'textarea', 'textarea'],
    ['wv_link', 'text', 'input'],
  ],
  init_formFieldsValues: {
    wv_desc: '...',
    wv_link: '...',
  },
  getLink: `${SERVER_URI}/api/getSectionData/${wv}`,
  postLink: `${SERVER_URI}/api/postSectionData`,
};
