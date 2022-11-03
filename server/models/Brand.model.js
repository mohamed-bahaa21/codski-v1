const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const sample = {
    "name": "ZEISS",
    "imgs": ["image 1 url", "image 2 url"],
    "before_after": [
        { "name": "Office", "before": "before img", "after": "after img" },
    ],
    "description": "61985c81362e91a5d4b4f18e"
}


const BrandSchema = new Schema({
    "name_id": {
        type: String,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "imgs": [{
        type: String
    }],
    "before_after": [{
        "name": { type: String },
        "before": { type: String },
        "after": { type: String }
    }],
    "description": {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Editor'
    },
})

module.exports = mongoose.model('Brand', BrandSchema);