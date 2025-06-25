const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/Post");
const cors = require("cors");
const connectDB = require("./lib/db");


const app = express();
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: "*"
}));
//const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogdb";
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("API Blog en ligne");
});

app.post("/posts", async (req, res) => {
  try {
    await connectDB();
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/posts", async (req, res) => {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// const PORT = 8000;
// app.listen(PORT, () => console.log(`Serveur démarré`));
module.exports = app;