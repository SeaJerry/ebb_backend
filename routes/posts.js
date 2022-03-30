const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// G E T  B Y  I D

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(err);
  }
});

// G E T  A L L

router.get("/", async (req, res) => {
  const username = req.query.user;
  try {
    let posts;
    if (username) {
      posts = await Post.findById({ username });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(err);
  }
});

// C R E A T E

router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// U P D A T E

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("Must Be User To Update");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// D E L E T E

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post Deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(400).json("Only allowed to delete your posts");
    }
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
