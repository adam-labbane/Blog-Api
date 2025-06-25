const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const cors = require("cors");


const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
//const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogdb";

app.use(express.json());

mongoose.connect("mongodb+srv://adam:adam1234%40mongo@cluster0.hrwrde2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur MongoDB :", err));

// Routes
app.get("/", (req, res) => {
  res.send("API Blog en ligne");
});

app.post("/posts", async (req, res) => {
  try {
    console.log("📥 Reçu du frontend :", req.body);
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    console.error("Erreur création post :", err);
    res.status(400).json({ error: err.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;