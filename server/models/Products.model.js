const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    "title": {
        type: String,
        required: false
    },
    "content": {
        type: String,
        required: false
    }
})

module.exports = mongoose.model('Product', ProductSchema);