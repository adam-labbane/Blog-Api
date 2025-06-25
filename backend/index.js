const express = require("express");
const connectDB = require("./lib/db");
const Post = require("./models/Post");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Blog en ligne");
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

app.post("/posts", async (req, res) => {
  try {
    await connectDB();
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = app;
