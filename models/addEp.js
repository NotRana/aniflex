const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addEp = new Schema({
  anime_id: {
    type: String,
    required: false,
  },
  ep_no:Number,
  title:String,
  season:Number,
  video_url:String,
  synopsis:String
})

const addEpModel = mongoose.model("addEp",addEp)

module.exports = addEpModel;