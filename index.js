const express = require("express");
const app = express();
const config = require("./config.json");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const admin = require("./routers/admin.js");
const upload = require("./api/upload.js");
const animeCreate = require("./models/animeCreate.js")
const addEp = require("./models/addEp.js")
const anime = require("./routers/anime.js")
let port = config.port;
app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(config.mongodb);

// Router Here
app.use("/admin", admin);
app.use("/upload", upload);
app.use("/anime", anime);


app.get("/", async(req, res) => {
  const populer = await animeCreate.find({}).sort({views: -1}).limit(10).exec()
  const latest = await animeCreate.find({}).sort({release_date: -1}).limit(10).exec()
    
      // populer now contains an array of objects
    res.render("index", { config, populer,latest });
    
});


app.get("/search", async (req, res) => {
  const query = req.query.q.toLowerCase();
  try {
    const results = await animeCreate.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive search
    });
    res.render("search.ejs",{results,config});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.listen(port, () => {
  console.log(`anime website is runnig on ${port} `);
});
