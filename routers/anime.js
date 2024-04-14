const mongoose = require("mongoose");
const exprees = require("express");
const router = exprees.Router();
const config = require("../config.json");
const animeCreate = require("../models/animeCreate.js")
const addEp = require("../models/addEp.js")

router.get("/:id", async (req, res) => {
  try {
    const animeid = req.params.id;

    // Find the anime by ID
    const anime = await animeCreate.findOne({ _id: animeid }).exec();
    const episodes = await addEp.find({ anime_id: animeid }).sort({ ep_no: 1 }).exec();
    if (!anime) {
      return res.status(404).send("Anime not found");
    }

    // Group episodes by season
    const season_no = []
    const seasons = {};
    episodes.forEach(episode => {
      if (!seasons[episode.season]) {
        seasons[episode.season] = [];
        season_no.push(episode.season)
      }
      seasons[episode.season].push(episode);
    
    });



    // Update the views count
    await animeCreate.updateOne({ _id: animeid }, { $inc: { views: 1 } });

    // Send the updated anime object and episodes in the response
    res.render("animedetail.ejs", { config, anime,seasons,season_no, episodes,animeid });
  } catch (error) {
    console.error("Error fetching anime:", error);
    res.status(500).send("Error fetching anime");
  }
});


router.get('/byseasons/:animeid/:season',async (req,res)=>{
  const anime_id = req.params.animeid;
  const season = req.params.season;

  const anime = await addEp.find({anime_id:anime_id,season:season}).sort({ ep_no: 1 }).exec()
  res.json(anime)

})


module.exports = router