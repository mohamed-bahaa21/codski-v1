const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  username: {
    type: String
  },
  sender: {
    type: String
  },
  message: {
    type: String
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("Chat", ChatSchema);;
