console.log('test')

var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "12e5cc60c495f0b959a91981be861758");
myHeaders.append("x-rapidapi-host", "https://v2.nba.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

let recentGames = [];

async function lastFiveGames() {
    let data = await fetch(`https://v2.nba.api-sports.io/games?league=standard&season=2022`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error));
    let gameArray = data.response;
    for(let i = 0; recentGames.length < 5; i++) {
        let score = gameArray[gameArray.length - 1 - i].scores.visitors.linescore.length;
        if(score > 0) {
            recentGames.push(gameArray[gameArray.length - 1 - i])
        }
    }
    console.log(recentGames);
    displayTeams();
}

function displayTeams() {
    let game = document.getElementById('game')
    let home = document.getElementById('home')
    let visitors = document.getElementById('visitors')
    home.innerHTML = recentGames[0].teams.home.name
    visitors.innerHTML = recentGames[0].teams.visitors.name
    let homePic = document.getElementById('homePic').src=`${recentGames[0].teams.home.logo}`
    let visitorsPic = document.getElementById('visitorPic').src=`${recentGames[0].teams.visitors.logo}`
    displayStats();
}

function displayStats() {
    let homeStats = document.getElementById('homeStats');
    let visitorStats = document.getElementById('visitorStats');
    let scoreHome = document.createElement("li");
    let scoreVisitor = document.createElement("li");
    scoreHome.innerHTML = `Points: ${recentGames[0].scores.home.points}`;
    scoreVisitor.innerHTML = `Points: ${recentGames[0].scores.visitors.points}`;
    visitorStats.append(scoreVisitor);
    homeStats.append(scoreHome);
    for(let i = 0; i < 4; i++) {
        let quarterPoints = document.createElement('li');
        let quarterPoints2 = document.createElement('li');
        quarterPoints.innerHTML = `Q${i+1}: ${recentGames[0].scores.home.linescore[i]}`;
        quarterPoints2.innerHTML = `Q${i+1}: ${recentGames[0].scores.visitors.linescore[i]}`;
        homeStats.append(quarterPoints);
        visitorStats.append(quarterPoints2);
    }
}

lastFiveGames();






