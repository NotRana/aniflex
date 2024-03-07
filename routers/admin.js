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
    res.render("dashboard.newanime.ejs", { successfull:"" })
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
    // const anime_id = req.params.id;
    // const anime = await animeCreate.findOne({_id:anime_id})
    res.render("dashboard.animeaddep.ejs")
  }else{res.redirect('/admin/login')}
})

router.post("/dashboard/addep", async(req, res) => {
  const anime_id = req.body.anime_id;
  const anime_title = req.body.anime_title;
  const synopsis = req.body.synopsis;
  const epno = req.body.ep_no;
  const video_url = req.body.video_url;
  const newEp = new addEp({
    anime_id:anime_id,
    title:anime_title,
    synopsis:synopsis,
    ep_no:epno,
    video_url:video_url
  })
  await newEp.save({timeout:20000})
  
  console.log(anime_id, anime_title, synopsis, epno, video_url)
 
});



module.exports = router;
