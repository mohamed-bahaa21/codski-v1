import SERVER_URI from '.server.env';
import { ss } from './sectionsId';

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
  sectionID: ss,
  formFieldsName: [
    'Description',
  ],
  formFields: [
    'ss_desc',
  ],
  formFieldsType: [
    ['ss_desc', 'textarea', 'textarea'],
  ],
  init_formFieldsValues: {
    ss_desc: '...',
  },
  getLink: `${SERVER_URI}/api/getSectionData/${ss}`,
  postLink: `${SERVER_URI}/api/postSectionData`,
};
