import SERVER_URI from '.server.env';
import { li1 } from './sectionsId';

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
    sectionID: li1,
    formFieldsName: [
        'Image',
        'Paragraph 1',
        'Paragraph 2',
        'Paragraph 3',
        'Paragraph 4',
    ],
    formFields: [
        'li1_img',
        'li1_parag_1',
        'li1_parag_2',
        'li1_parag_3',
        'li1_parag_4',
    ],
    formFieldsType: [
        ['li1_img', 'text', 'input'],
        ['li1_parag_1', 'textarea', 'textarea'],
        ['li1_parag_2', 'textarea', 'textarea'],
        ['li1_parag_3', 'textarea', 'textarea'],
        ['li1_parag_4', 'textarea', 'textarea'],
    ],
    init_formFieldsValues: {
        li1_img: '...',
        li1_parag_1: '...',
        li1_parag_2: '...',
        li1_parag_3: '...',
        li1_parag_4: '...',
    },
    getLink: `${SERVER_URI}/api/getSectionData/${li1}`,
    postLink: `${SERVER_URI}/api/postSectionData`,
};
