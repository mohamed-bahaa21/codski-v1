const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    "img_url": {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Gallery', GallerySchema);