const express = require('express');
const axios = require('axios');
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../util/auth');
const router = require('express').Router();
const { renderDiscussionPage } = require('../../controllers/api/discussionController');






// Home route
router.get('/', async (req, res) => {
  try {
    // Fetch the last four trending NBA games from the API
    const response = await axios.get('https://rapidapi.com/theoddsapi/api/live-sports-odds', {
      headers: {
        'X-RapidAPI-Key': '12e5cc60c495f0b959a91981be861758',
        'X-RapidAPI-Host': 'https://api.the-odds-api.com'
      },
      params: {
        trend: 'true',
        limit: 4
      }
    });

    // Extract the game data from the API response
    const games = response.data.api.games;
    
    console.log(response.data);


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

// Logout route
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  } else {
    res.status(404).end();
  }
});




// Add a route for the discussion page
router.get('/discussion/:gameId', renderDiscussionPage);

module.exports = router;




