const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const MailSchema = new Schema({
    "mail_email": {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Mail', MailSchema);