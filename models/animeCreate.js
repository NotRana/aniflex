const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const animeCreate = new Schema({
  name: String,
  description: String,
  image: String,
  genres: String,
  release_date: String,
  views:{type:Number,default:0}
})

const animeCreateModel = mongoose.model("animeCreate",animeCreate)
module.exports = animeCreateModel;