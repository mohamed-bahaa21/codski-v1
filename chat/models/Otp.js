const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpSchema = new Schema({
    otp: {
        type: String,
        expires: '1d'
    },
    messageId: {
        type: String
    },
    valid: {
        type: Boolean,
    },
});
module.exports = mongoose.model("Otp", OtpSchema);;
