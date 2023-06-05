const express = require('express');
const axios = require('axios');
const router = express.Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../util/auth');

// Home route
router.get('/', async (req, res) => {
  try {
    // Fetch the last four trending NBA games from the API
    const response = await axios.get('https://api-nba-v1.p.rapidapi.com/games', {
      headers: {
        'X-RapidAPI-Key': '12e5cc60c495f0b959a91981be861758',
        'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com'
      },
      params: {
        trend: 'true',
        limit: 4
      }
    });

    // Extract the game data from the API response
    const games = response.data.api.games;

    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { games, posts, isAuthenticated: req.session.logged_in });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('signup');
  }
});

// Post route
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id.' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('post', { post, isAuthenticated: req.session.logged_in });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
