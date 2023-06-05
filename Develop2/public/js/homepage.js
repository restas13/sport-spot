// Function to fetch the last four game results from the NBA API
//const fetchLastFourGameResults = async () => {
  //try {
    //const response = await axios.get('https://odds.p.rapidapi.com/v4/sports', {
      //params: {
        //limit: 4,
        //sort: 'desc',
      //},
    //});

    const gameResults = response.data.results;

    // Render the game results as cards on the homepage
    const gameResultsContainer = document.getElementById('game-results-container');
    gameResultsContainer.innerHTML = '';

    gameResults.forEach((result) => {
      const card = createGameResultCard(result);
      gameResultsContainer.appendChild(card);
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to create a game result card
const createGameResultCard = (result) => {
  const card = document.createElement('div');
  card.classList.add('card');

  // Add the game result data to the card

  const discussionButton = document.createElement('button');
  discussionButton.innerText = 'Discussion';
  discussionButton.addEventListener('click', () => {
    // Handle discussion button click
  });
  card.appendChild(discussionButton);

  return card;
};

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector("#loginButton");
  const logoutButton = document.querySelector("#logoutButton");
  const signInButton = document.querySelector("#signInButton");
  const searchForm = document.querySelector("#searchForm");

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

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // Handle search form submission
  });

  fetchLastFourGameResults();
});
