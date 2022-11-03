const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const dev_url = "mongodb://localhost:27017/chat";
const prod_url = "mongodb+srv://mohammad123:mohammad123@blogdb-fslqm.mongodb.net/horizon";

const connect = mongoose.connect(prod_url, { useNewUrlParser: true });

module.exports = connect;
