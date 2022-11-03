import SERVER_URI from '.server.env';
import { hero } from './sectionsId';

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
  sectionID: hero,
  formFieldsName: [
    'Hero Name',
    'Paragraph 1',
    'Header 1',
    'Paragraph 2',
    'Link Name',
    'Link Href',
    'Design State',
    'Design Img',
  ],
  formFields: [
    'hero_name',
    'hero_parag_1',
    'hero_header_1',
    'hero_parag_2',
    'hero_link_1_name',
    'hero_link_1_href',
    'design_state',
    'design_img',
  ],
  formFieldsType: [
    ['hero_name', 'text', 'input'],
    ['hero_parag_1', 'textarea', 'textarea'],
    ['hero_header_1', 'text', 'input'],
    ['hero_parag_2', 'textarea', 'textarea'],
    ['hero_link_1_name', 'text', 'input'],
    ['hero_link_1_href', 'text', 'input'],
    ['design_state', 'checkbox', 'input'],
    ['design_img', 'text', 'input'],
  ],
  init_formFieldsValues: {
    hero_name: '...',
    hero_parag_1: '...',
    hero_header_1: '...',
    hero_parag_2: '...',
    hero_link_1_name: '...',
    hero_link_1_href: '...',
    design_state: true,
    design_img: '...',
  },
  getLink: `${SERVER_URI}/api/getSectionData/${hero}`,
  postLink: `${SERVER_URI}/api/postSectionData`,
};
