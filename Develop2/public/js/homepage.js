document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector("#loginButton");
    const logoutButton = document.querySelector("#logoutButton");
    const signInButton = document.querySelector("#signInButton");

    // Add event listeners to the buttons
    loginButton.addEventListener("click", () => {
        // Handle login logic
    });

    logoutButton.addEventListener("click", () => {
        // Handle logout logic
    });

    signInButton.addEventListener("click", () => {
        // Handle sign in logic
    });
});







// This is the JavaScript logic for the homepage view

// Add your JavaScript code here

// Example code: Update the DOM with the game data
const gamesContainer = document.querySelector('#games-container');

// Function to create a game card element
function createGameCard(game) {
  const card = document.createElement('div');
  card.classList.add('card');

  const title = document.createElement('h2');
  title.innerText = game.title;
  card.appendChild(title);

  // Add more elements and data as needed

  return card;
}

// Example code: Render the game data on the page
function renderGames(games) {
  gamesContainer.innerHTML = '';

  games.forEach((game) => {
    const card = createGameCard(game);
    gamesContainer.appendChild(card);
  });
}

// Example code: Make an AJAX request to fetch the game data
fetch('/api/games')
  .then((response) => response.json())
  .then((data) => {
    const games = data.games;
    renderGames(games);
  })
  .catch((error) => console.error(error));



  fetch('/api/results')
  .then(response => response.json())
  .then(data => {
    const results = data.results;
    const template = Handlebars.compile(`
      {{#each results}}
        <div class="card">
          <h2>{{team1}} vs {{team2}}</h2>
          <p>Date: {{date}}</p>
          <p>Score: {{score}}</p>
        </div>
      {{/each}}
    `);
    const renderedHtml = template({ results });
    document.querySelector('.results-container').innerHTML = renderedHtml;
  })
  .catch(error => {
    console.error('Error:', error);
  });

