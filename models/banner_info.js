const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const banner_info = new Schema({
    name: String,
    description: String,
    image: String,
    anime_url: String
})

const banner_infoModel = mongoose.model("banner_info",banner_info)

module.exports = banner_infoModel;