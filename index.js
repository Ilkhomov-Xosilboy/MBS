const express = require("express");
const path = require("path");
const app = express();
const expressEdge = require("express-edge");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 2000;
const Post = require ("./models/Post")

app.use(express.json());
app.use(express.urlencoded({extended: true}));


mongoose.connect("mongodb+srv://Freezzer:OKpPENa8L70KSVwK@mbs.lsrkdim.mongodb.net/MBS");

app.use(express.static(__dirname + "/public/"));

app.listen(PORT , () => {
  console.log("Express ishlamoqda...");
});

// Dvijog o'rnatish
app.use(expressEdge);

app.set("views", `${__dirname}/views`);

app.get("/MBS-admin", async (req, res) => {
  const posts = await Post.find();
  console.log(posts);
  res.render("admin-panel" , {posts});
});
app.get("/:id/delete" , async(req , res)=>{
  if(!req.query.allow){
    return res.redirect("/");
  }
  const reg = await Post.findById(req.params.id);
  console.log(reg);
  res.render("deletereg" , {reg});
});
app.post("/MBS-admin/delete" , async(req , res)=>{
  try {
    await Post.deleteOne({_id: req.body.id});
    res.redirect("/MBS-admin");
  } catch (e) {
    console.log(e);
  }
});

app.get("/", (req, res) => {
  res.render("index");
});


app.get("/vedio-bolimi", (req, res) => {
  res.render("admin-vedio-qoshish");
});

app.post("/MBS-admin", async (req, res) => {
  try {
    console.log(req.body);
    const post = await Post.create(req.body);
    console.log("Post saved successfully:", post);

    const telegramChannelLink = 'https://t.me/mbsdarslik';
    res.redirect(telegramChannelLink);
  } catch (error) {
    console.error("Error saving post:", error);
    res.redirect("/MBS-admin?error=1");
  }
});




// OKpPENa8L70KSVwK
// mongodb+srv://Freezzer:OKpPENa8L70KSVwK@mbs.lsrkdim.mongodb.net/MBS