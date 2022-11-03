import SERVER_URI from '.server.env';
import { landing } from './pagesId';

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
    page_id: landing,
    formFieldsName: [
        'Title',
        'Description',
        'Robots',
        'Keywords',
        'Card Site Name',
        'Card Title',
        'Card Description',
        'Card Img',
        'Card Url',
        'Twitter Card',
        'Card Img Alt'
    ],
    formFields: [
        'page_title',
        'page_desc',
        'page_robots',
        'page_keywords',
        'card_site_name',
        'card_title',
        'card_desc',
        'card_img',
        'card_url',
        'twitter_card',
        'card_img_alt'
    ],
    formFieldsType: [
        ['page_title', 'text', 'input'],
        ['page_desc', 'textarea', 'textarea'],
        ['page_robots', 'textarea', 'textarea'],
        ['page_keywords', 'textarea', 'textarea'],
        ['card_site_name', 'text', 'input'],
        ['card_title', 'text', 'input'],
        ['card_desc', 'textarea', 'textarea'],
        ['card_img', 'text', 'input'],
        ['card_url', 'text', 'input'],
        ['twitter_card', 'text', 'input'],
        ['card_img_alt', 'text', 'input'],
    ],
    init_formFieldsValues: {
        page_title: '...',
        page_desc: '...',
        page_robots: '...',
        page_keywords: '...',
        card_site_name: '...',
        card_title: '...',
        card_desc: '...',
        card_img: '...',
        card_url: '...',
        twitter_card: '...',
        card_img_alt: '...'
    },
    getLink: `${SERVER_URI}/api/getSeoData/${landing}`,
    postLink: `${SERVER_URI}/api/postSeoData/${landing}`,
};
