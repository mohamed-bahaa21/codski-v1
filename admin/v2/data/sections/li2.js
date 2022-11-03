import SERVER_URI from '.server.env';
import {li2} from './sectionsId';

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
  sectionID: li2,
  formFieldsName: [
    'Image',
    'Left Paragraph 1 Header',
    'Left Paragraph 1 Content',
    'Left Paragraph 2 Header',
    'Left Paragraph 2 Content',
    'Left Paragraph 3 Header',
    'Left Paragraph 3 Content',
    'Right Paragraph 1 Header',
    'Right Paragraph 1 Content',
    'Right Paragraph 2 Header',
    'Right Paragraph 2 Content',
    'Right Paragraph 3 Header',
    'Right Paragraph 3 Content',
  ],
  formFields: [
    'li2_image',
    'li2_lft_parag_1_header',
    'li2_lft_parag_1_content',
    'li2_lft_parag_2_header',
    'li2_lft_parag_2_content',
    'li2_lft_parag_3_header',
    'li2_lft_parag_3_content',
    'li2_rght_parag_1_header',
    'li2_rght_parag_1_content',
    'li2_rght_parag_2_header',
    'li2_rght_parag_2_content',
    'li2_rght_parag_3_header',
    'li2_rght_parag_3_content',
  ],
  formFieldsType: [
    ['li2_image', 'text', 'input'],
    ['li2_lft_parag_1_header', 'text', 'input'],
    ['li2_lft_parag_1_content', 'textarea', 'textarea'],

    ['li2_lft_parag_2_header', 'text', 'input'],
    ['li2_lft_parag_2_content', 'textarea', 'textarea'],

    ['li2_lft_parag_3_header', 'text', 'input'],
    ['li2_lft_parag_3_content', 'textarea', 'textarea'],

    ['li2_rght_parag_1_header', 'text', 'input'],
    ['li2_rght_parag_1_content', 'textarea', 'textarea'],

    ['li2_rght_parag_2_header', 'text', 'input'],
    ['li2_rght_parag_2_content', 'textarea', 'textarea'],

    ['li2_rght_parag_3_header', 'text', 'input'],
    ['li2_rght_parag_3_content', 'textarea', 'textarea'],
  ],
  init_formFieldsValues: {
    li2_image: '...',
    li2_lft_parag_1_header: '...',
    li2_lft_parag_1_content: '...',
    li2_lft_parag_2_header: '...',
    li2_lft_parag_2_content: '...',
    li2_lft_parag_3_header: '...',
    li2_lft_parag_3_content: '...',
    li2_rght_parag_1_header: '...',
    li2_rght_parag_1_content: '...',
    li2_rght_parag_2_header: '...',
    li2_rght_parag_2_content: '...',
    li2_rght_parag_3_header: '...',
    li2_rght_parag_3_content: '...',
  },
  getLink: `${SERVER_URI}/api/getSectionData/${li2}`,
  postLink: `${SERVER_URI}/api/postSectionData`,
};
