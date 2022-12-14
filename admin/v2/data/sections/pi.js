import SERVER_URI from '.server.env';
import { pi } from './sectionsId';

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
  sectionID: pi,
  formFieldsName: [
    'Description',
    'Item 1 Image',
    'Item 1 Num',
    'Item 1 Title',
    'Item 2 Image',
    'Item 2 Num',
    'Item 2 Title',
    'Item 3 Image',
    'Item 3 Num',
    'Item 3 Title',
    'Item 4 Image',
    'Item 4 Num',
    'Item 4 Title',
  ],
  formFields: [
    'pi_desc',
    'pi_item_1_img',
    'pi_item_1_num',
    'pi_item_1_title',
    'pi_item_2_img',
    'pi_item_2_num',
    'pi_item_2_title',
    'pi_item_3_img',
    'pi_item_3_num',
    'pi_item_3_title',
    'pi_item_4_img',
    'pi_item_4_num',
    'pi_item_4_title',
  ],
  formFieldsType: [
    ['pi_desc', 'textarea', 'textarea'],
    ['pi_item_1_img', 'text', 'input'],
    ['pi_item_1_num', 'number', 'input'],
    ['pi_item_1_title', 'text', 'input'],

    ['pi_item_2_img', 'text', 'input'],
    ['pi_item_2_num', 'number', 'input'],
    ['pi_item_2_title', 'text', 'input'],

    ['pi_item_3_img', 'text', 'input'],
    ['pi_item_3_num', 'number', 'input'],
    ['pi_item_3_title', 'text', 'input'],

    ['pi_item_4_img', 'text', 'input'],
    ['pi_item_4_num', 'number', 'input'],
    ['pi_item_4_title', 'text', 'input'],
  ],
  init_formFieldsValues: [{
    pi_desc: '...',
    pi_item_1_img: '...',
    pi_item_1_num: '...',
    pi_item_1_title: '...',
    pi_item_2_img: '...',
    pi_item_2_num: '...',
    pi_item_2_title: '...',
    pi_item_3_img: '...',
    pi_item_3_num: '...',
    pi_item_3_title: '...',
    pi_item_4_img: '...',
    pi_item_4_num: '...',
    pi_item_4_title: '...',
  }],
  getLink: `${SERVER_URI}/api/getSectionData/${pi}`,
  postLink: `${SERVER_URI}/api/postSectionData`,
};
