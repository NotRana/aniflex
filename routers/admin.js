const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const config = require("../config.json");
const animeCreate = require("../models/animeCreate.js");
const addEp = require("../models/addEp.js");
const { generateKeySync } = require("crypto");
const router = express.Router();

// Configure express-session middleware
router.use(session({
  secret: config.secret, // Change this to a secure random string
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

router.get("/login", (req, res) => {
  res.render('admin.login.ejs',{error:""})
})

router.post("/login", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username === config.admin.username && password === config.admin.password){
    // Store user information in session
    req.session.adminLoggedIn = true;
    res.redirect("dashboard");
  } else {
    res.render("admin.login.ejs", { error: "Invalid username or password" })
  }
});

router.get("/logout", (req, res) => {
  // Destroy session on logout
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.sendStatus(500);
    }
    res.send("Logged out successfully");
  });
});


router.get("/dashboard", (req, res) => {
  if (req.session.adminLoggedIn) {
    // Admin is logged in, render the dashboard
    res.render("admin.dashboard.ejs");
  } else {
    // Admin is not logged in, redirect to login page
    res.redirect("/admin/login");
  }
});

router.get("/dashboard/newanime", (req, res) => {
  if (req.session.adminLoggedIn) {
    // Admin is logged in, render the dashboard
    res.render("dashboard.newanime.ejs", { config:config,successfull:"" })
  } else {
    // Admin is not logged in, redirect to login page
    res.redirect("/admin/login");
  }
});

router.post("/dashboard/newanime", async (req, res) => {

  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const genres = req.body.genres;
  const release_date = req.body.release_date;
  const newAnime = new animeCreate({
    name:name,
    description:description,
    image:image,
    genres: genres,
    release_date:release_date
  })
  await newAnime.save({timeout:20000})
  console.log(name, image, description)
  res.render("dashboard.newanime.ejs", { successfull:"done" })
});


router.get("/dashboard/showanime",async (req,res)=>{
  if (req.session.adminLoggedIn){
    const all_anime = await animeCreate.find({})
    res.render("dashboard.showanime.ejs",{all_anime})
  }else{
    res.redirect('/admin/login')
  }
})

router.get("/dashboard/addep", (req, res) =>{
  if (req.session.adminLoggedIn){
   
    res.render("dashboard.animeaddep.ejs",{config})
  }else{res.redirect('/admin/login')}
})

router.post("/dashboard/addep", async (req, res) => {
  const anime_id = req.body.anime_id;
  const anime_title = req.body.anime_title;
  const synopsis = req.body.synopsis;
  const epno = req.body.ep_no;
  const video_url = req.body.video_url;
  const season = req.body.season;

  const newEp = new addEp({
    anime_id: anime_id,
    title: anime_title,
    synopsis: synopsis,
    ep_no: epno,
    season: season,
    video_url: video_url
  });

  try {
    await newEp.save();
    console.log(anime_id, anime_title, synopsis, epno, video_url);
    
    // Send a success response
    res.status(200).json({ message: "Anime episode added successfully" });
  } catch (error) {
    console.error("Error adding anime episode:", error);
    
    // Send an error response
    res.status(500).json({ error: "Failed to add anime episode" });
  }
});

router.get('/dashboard/updateanime/:id',async(req,res)=>{
  if(req.session.adminLoggedIn){
    const anime_id = req.params.id;
    const anime_from_db = await animeCreate.findById(anime_id)
    res.render('dashboard.updateanime.ejs',{anime_from_db})
  }else{
    res.redirect('/admin/login')
  }
})


router.post('/dashboard/updateanime/:id', async (req, res) => {
  const animeId = req.params.id;
  
  try {
      const updatedAnime = await animeCreate.findByIdAndUpdate(animeId, req.body, { new: true });
      res.json(updatedAnime);
  } catch (error) {
      console.error('Error updating anime:', error);
      res.status(500).json({ error: 'An error occurred while updating anime.' });
  }
});


router.get('/dashboard/updateepisode/:id',async(req,res)=>{
  if(req.session.adminLoggedIn){
    const anime_id = req.params.id;
    const episode_from_db = await addEp.findById(anime_id)
    res.render('dashboard.updateepisode.ejs',{episode_from_db})
  }else{
    res.redirect('/admin/login')
  }
})


router.post('/dashboard/updateepisode/:id', async (req, res) => {
  const epId = req.params.id;
  
  try {
      const updatedEpisode = await addEp.findByIdAndUpdate(epId, req.body, { new: true });
      res.json(updatedEpisode);
  } catch (error) {
      console.error('Error updating anime:', error);
      res.status(500).json({ error: 'An error occurred while updating anime.' });
  }
});


router.get('/dashboard/viewepisodes/:id',async(req,res)=>{
  if(req.session.adminLoggedIn){
    let anime_id = req.params.id;
    let episodes = await addEp.find({anime_id:anime_id}).exec()
    res.render("dashboard.viewepisodes.ejs",{episodes})
  }else{
    res.redirect("/admin/login")
  }

})



router.delete('/dashboard/deleteanime/:id', async (req, res) => {
  const animeId = req.params.id;

  try {
      await animeCreate.findByIdAndDelete(animeId);
      res.json({ message: 'Anime deleted successfully.' });
  } catch (error) {
      console.error('Error deleting anime:', error);
      res.status(500).json({ error: 'An error occurred while deleting anime.' });
  }
});


router.delete('/dashboard/deleteepisode/:id', async (req, res) => {
  const episodeId = req.params.id;

  try {
      await addEp.findByIdAndDelete(episodeId);
      res.json({ message: 'Episode deleted successfully.' });
  } catch (error) {
      console.error('Error deleting episode:', error);
      res.status(500).json({ error: 'An error occurred while deleting episode.' });
  }
});


module.exports = router;
