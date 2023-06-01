const router = require('express').Router();
const { Post } = require('../models');

// Define the POST route for adding a post
router.post('/posts', async (req, res) => {
  try {
    // Create a new post with the provided data
    const newPost = await Post.create(req.body);

    // Return the newly created post
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Define the GET route for retrieving all posts
router.get('/posts', async (req, res) => {
  try {
    // Retrieve all posts
    const posts = await Post.findAll();

    // Return the posts
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
