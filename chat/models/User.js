const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        trim: true,
        required: false,
        index: {
            unique: true,
            partialFilterExpression: { username: { $type: "string" } }
        }
    },
    password: {
        type: String,
        required: false,
    },
    otp: {
        type: String,
        expires: '1d',
    },
    otp_messageId: {
        type: String,
        expires: '1d',
        required: false,
    },
    otp_valid: {
        type: Boolean,
        expires: '1d',
        required: true,
    },
    unread: {
        type: Boolean,
        required: false,
        default: true
    },
    chat: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    }]
});
module.exports = mongoose.model("User", UserSchema);;
