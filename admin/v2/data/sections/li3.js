import SERVER_URI from '.server.env';
import { li3 } from './sectionsId';

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
  sectionID: li3,
  formFieldsName: [
    'Paragraph 1',
    'Paragraph 2',
    'Paragraph 3',
    'Paragraph 4',
    'Paragraph 5',
    'Paragraph 6',
    'Image',
  ],
  formFields: [
    'li3_parag_1',
    'li3_parag_2',
    'li3_parag_3',
    'li3_parag_4',
    'li3_parag_5',
    'li3_parag_6',
    'li3_img',
  ],
  formFieldsType: [
    ['li3_parag_1', 'textarea', 'textarea'],
    ['li3_parag_2', 'textarea', 'textarea'],
    ['li3_parag_3', 'textarea', 'textarea'],
    ['li3_parag_4', 'textarea', 'textarea'],
    ['li3_parag_5', 'textarea', 'textarea'],
    ['li3_parag_6', 'textarea', 'textarea'],
    ['li3_img', 'text', 'input'],
  ],
  init_formFieldsValues: {
    li3_parag_1: '...',
    li3_parag_2: '...',
    li3_parag_3: '...',
    li3_parag_4: '...',
    li3_parag_5: '...',
    li3_parag_6: '...',
    li3_img: '...'
  },
  getLink: `${SERVER_URI}/api/getSectionData/${li3}`,
  postLink: `${SERVER_URI}/api/postSectionData`,
};
