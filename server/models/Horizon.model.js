const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const HorizonSchema = new Schema({
    "section_index": {
        type: Number,
        required: true,
        unique: true
    },
    "section_display": {
        type: Boolean,
        required: true
    },
    "section_name": {
        type: String,
        required: true
    },
    "section_content": {
        type: Object,
        required: false
    },
})

module.exports = mongoose.model('Horizon', HorizonSchema);