const express = require('express');
const router = express.Router();
const axios = require('axios');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');
const { renderDiscussionPage } = require('./api/discussionRoutes');

router.get('/', async (req, res) => {
  try {
    const response = await axios.get('https://v2.nba.api-sports.io/games?league=standard&season=2022', {
      headers: {
        'x-rapidapi-key': '12e5cc60c495f0b959a91981be861758',
        'x-rapidapi-host': 'https://v2.nba.api-sports.io'
      }
    });
    const games = response.data.response;

    // Render the featuredGames view with the games data
    res.render('featuredGames', { games });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).redirect('/');
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
