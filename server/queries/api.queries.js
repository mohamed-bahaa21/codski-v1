const Horizon = require('../models/Horizon.model');
const Seo = require('../models/Seo.model');


exports.GET_HORIZON_SECTION_CONTENT = (req, res, sectionID) => {
    Horizon.findOne({ _id: sectionID })
        .then(section => {
            res.json(section);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
}

exports.POST_HORIZON_SECTION_CONTENT = (req, res, sectionID, data) => {
    Horizon.findById(sectionID)
        .then((horizon) => {
            // console.log(horizon);
            horizon.section_content = data;

            horizon
                .save()
                .then(() => res.json('horizon updated!'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
}

// =================================================================================
// =================================================================================
// =================================================================================

exports.GET_HORIZON_SEO_DATA = (req, res, page_id) => {
    Seo.findOne({ page_id: page_id })
        .then(seo => {
            res.json(seo);
        })
        .catch((err) => res.status(400).json('Error: ' + err));
}

exports.POST_HORIZON_SEO_DATA = (req, res, page_id, data) => {
    Seo.findOne({ page_id: page_id })
        .then((seo) => {
            seo.page_title = data.page_title;
            seo.page_desc = data.page_desc;
            seo.page_robots = data.page_robots;
            seo.page_keywords = data.page_keywords;
            seo.card_site_name = data.card_site_name;
            seo.card_title = data.card_title;
            seo.card_desc = data.card_desc;
            seo.card_img = data.card_img;
            seo.card_url = data.card_url;
            seo.card_img_alt = data.card_img_alt;
            seo.twitter_card = data.twitter_card;

            seo.save()
                .then(() => res.json('seo data updated!'))
                .catch((err) => res.status(400).json('Error: ' + err));
        })
        .catch((err) => res.status(400).json('Error: ' + err));
}