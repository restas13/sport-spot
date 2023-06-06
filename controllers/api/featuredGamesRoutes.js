const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const exphbs = require('express-handlebars');

router.get('/game', async (req, res) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_HOST
    },
    redirect: 'follow'
  };

  let data = await fetch(`https://v2.nba.api-sports.io/games?league=standard&season=2022`, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));

  let recentGames = data.response.filter(game => game.scores.visitors.linescore.length > 0).slice(-5);
  
  res.render('game', { recentGames });  // Assuming you have a 'game' Handlebars template
});

module.exports = router;
