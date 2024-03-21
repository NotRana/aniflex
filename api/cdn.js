const express = require('express')
const router = express.Router();
const config = require('../config.json')

router.get('/',(req,res)=>{
    const cdn = config.upload_api;
    res.send({cdn: cdn}) 
})


module.exports = router;