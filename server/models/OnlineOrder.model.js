const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const OnlineOrderSchema = new Schema({
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "phone": {
        type: Number,
        required: true
    },
    "message": {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('OnlineOrder', OnlineOrderSchema);