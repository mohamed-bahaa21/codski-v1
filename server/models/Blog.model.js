const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    "published": {
        type: Boolean,
        default: false,
        required: true
    },
    "title": {
        type: String,
        required: true
    },
    "url": {
        type: String,
        required: true,
        unique: true
    },
    "summary": {
        type: String,
        required: true
    },
    "thumb_img": {
        type: String,
        required: true
    },
    "main_img": {
        type: String,
        required: true
    },
    "content": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Editor'
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Blog', BlogSchema);