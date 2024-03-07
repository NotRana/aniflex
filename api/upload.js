const fileUpload = require('express-fileupload');
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router()
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

 router.use(express.json());
router.use(
    fileUpload()
);

router.post('/', (req, res) => {
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) return res.sendStatus(400);

    const path = "/home/runner/AstroFlix-full-stack-app/public/upload/" + image.name;
    // Move the uploaded image to our upload folder
    image.mv(path);
    const returnpath = '/public/upload/' + image.name;

    res.status(201).json({ imageUrl: returnpath });

});
module.exports = router
