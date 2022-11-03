const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const SeoSchema = new Schema({
    "page_id": {
        type: String,
        required: true,
        unique: true
    },
    "page_title": {
        type: String,
        required: true
    },
    "page_desc": {
        type: String,
        required: true
    },
    "page_robots": {
        type: String,
        required: false
    },
    "page_keywords": {
        type: String,
        required: false
    },

    "card_site_name": {
        type: String,
        required: false
    },
    "card_title": {
        type: String,
        required: false
    },
    "card_desc": {
        type: String,
        required: false
    },
    "card_img": {
        type: String,
        required: false
    },
    "card_url": {
        type: String,
        required: false
    },
    "card_img_alt": {
        type: String,
        required: false
    },

    "twitter_card": {
        type: String,
        required: false
    },
})

module.exports = mongoose.model('Seo', SeoSchema);