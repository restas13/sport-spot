// Require necessary NPM modules
const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

// Set up Handlebars
const exphbs = require('express-handlebars');
router.engine('handlebars', exphbs());
router.set('view engine', 'handlebars');

// Function to get data
async function lastFiveGames() {
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
  return recentGames;
}

// Route
router.get('/game', async (req, res) => {
  const games = await lastFiveGames();
  const recentGame = games[0];  // Assuming you want the most recent game
  res.render('game', { recentGame });  // 'game' should be the name of your Handlebars template (without the .handlebars extension)
});

module.exports = router; // exporting the router
