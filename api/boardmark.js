const express = require('express')
const router = express.Router();
const config = require('../config.json')
const animeCreate = require("../models/animeCreate.js")
const addEp = require("../models/addEp.js")

router.get('/:id',async (req,res)=>{
    const anime_id = req.params.id;
    const anime = await animeCreate.findOne({_id:anime_id}).exec()
    res.json(anime)
})

module.exports = router;