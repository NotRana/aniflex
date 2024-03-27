const express = require("express");
const app = express();
const path = require("path")
const config = require("./config.json");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const admin = require("./routers/admin.js");
const upload = require("./api/upload.js");
const animeCreate = require("./models/animeCreate.js")
const bannerinfo = require('./models/banner_info.js')
const addEp = require("./models/addEp.js")
const anime = require("./routers/anime.js")
const cdnapi = require('./api/cdn.js')
let port = config.port;
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use('/public', express.static(path.join(__dirname, "public")));
app.use("/public", express.static(__dirname + "public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function connectmongo(){
  await mongoose.connect(config.mongodb || process.env.MONGODB_URI);
  console.log('MOngoDB Connected!');
  
}
connectmongo()
// Router Here
app.use("/admin", admin);
app.use("/upload", upload);
app.use("/anime", anime);

app.use('/api/cdn', cdnapi)


app.get("/home", async(req, res) => {
  const populer = await animeCreate.find({}).sort({views: -1}).limit(10).exec()
  const latest = await animeCreate.find({}).sort({release_date: -1}).limit(10).exec()
  const banner_info = await bannerinfo.findById('6602fb578c83a242d67264cb')
  
  
    res.render("index", { config, populer,latest ,banner_info});
    
});

app.get("/", async(req, res) => {
     
  res.render("home", { config });

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

app.get("/play/:anime_id/:anime_ep",async(req,res)=>{
  const anime_id = req.params.anime_id;
  const anime_ep = req.params.anime_ep;
  const anime = await addEp.findOne({anime_id:anime_id,ep_no:anime_ep}).exec()
  // console.log(anime)
  const recomend = await addEp.find({anime_id: anime_id, ep_no:{$gt: anime_ep}}).sort({ep_no:1}).limit(5).exec()
  res.render("play.ejs",{config ,anime,recomend})
})


app.get("/browse", async (req, res) => {
  const animeList = await animeCreate.find({}).sort({name: 1}).exec();
  res.render("browse_anime.ejs", { config, animeList });
});

/*
app.get('/updateseason', async (req, res) => {
  try {
    let update = await addEp.updateMany({}, { $set: { season: 1 } });
    res.send("Update successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating season");
  }
});
*/
// Remember to delete the route after execution



app.listen(port, () => {
  console.log(`anime website is runnig on ${port} `);
});
module.exports = app;
