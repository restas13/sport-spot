const express = require('express');
const router = express.Router();
const { Post, User, Comment } = require('../../models');

// Define the POST route for adding a post
router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define the GET route for retrieving all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username']
          }
        }
      ]
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { posts, isAuthenticated: req.session.logged_in });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
