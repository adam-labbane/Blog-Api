const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post");

const app = express();
const PORT = 8000;
//const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogdb";

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch((err) => console.error("Erreur MongoDB :", err));

// Routes
app.get("/", (req, res) => {
  res.send("API Blog en ligne");
});

app.post("/posts", async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
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

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
