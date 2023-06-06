const router = require('express').Router();
const { Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const express = require('express');


// Render the discussion page for a specific game
const renderDiscussionPage = async (req, res) => {
  try {
    const gameId = req.params.gameId;

    // Fetch the posts and comments for the game
    const posts = await Post.findAll({
      where: {
        game_id: gameId,
      },
      include: [
        {
          model: Comment,
          attributes: ['content', 'user_id'],
        },
      ],
    });

    // Render the discussion page with the posts and comments data
    res.render('discussion', { posts, gameId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

router.get('/discussion/:gameId', renderDiscussionPage);


module.exports = router;
