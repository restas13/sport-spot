var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "12e5cc60c495f0b959a91981be861758");
myHeaders.append("x-rapidapi-host", "https://v2.nba.api-sports.io");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

let nbaTeams = [];
let apiLink = '';
let section = document.getElementById('divideLists');
let gameList = document.getElementById('results');
gameList.style.display = 'none';

async function showResults() {
    let results = await fetch(`${apiLink}`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error))
    section.style.display = 'none';
    let list = document.createElement('ul')
    for(let i = results.response.length - 1; i >= 0; i--) {
        let game = document.createElement('div');
        let vs = document.createElement('p');
        vs.innerHTML = 'VS';
        let home = document.createElement('p');
        let visitors = document.createElement('p');
        let pic = document.createElement('div');
        let pic2 = document.createElement('div');
        let pointsHome = results.response[i].scores.home.points;
        let pointsVisitors = results.response[i].scores.visitors.points;
        home.innerHTML = results.response[i].teams.home.name
        visitors.innerHTML = results.response[i].teams.visitors.name
        let homePic = document.createElement('img')
        homePic.src=`${results.response[i].teams.home.logo}`
        let visitorsPic = document.createElement('img')
        visitorsPic.src=`${results.response[i].teams.visitors.logo}`
        homePic.style.height = '100px';
        homePic.style.width = '100px';
        visitorsPic.style.height = '100px';
        visitorsPic.style.width = '100px';
        pic.append(home)
        pic.append(homePic)
        pic2.append(visitors)
        pic2.append(visitorsPic)
        pic.append(pointsHome)
        pic2.append(pointsVisitors)
        pic.style.display = 'flex'
        pic2.style.display = 'flex'
        pic.style.flexDirection = 'column'
        pic2.style.flexDirection = 'column'
        game.append(pic)
        game.append(vs)
        game.append(pic2)
        document.body.append(game)
        game.addEventListener('click', function() {
            document.redirect.send(`/search/${results.response[i].id}`);
            console.log('test');
        })
    }
    console.log(results.response)
}

async function teamList(link) {
    let teamChoices = [];
    let data = await fetch(`https://v2.nba.api-sports.io/teams?league=standard`, requestOptions)
        .then(response => response.json())
        .catch(error => console.log('error', error))
   
    for(let i = 0; i < data.response.length; i++) {
        if(data.response[i].nbaFranchise == true && data.response[i].allStar == false) {
            nbaTeams.push(data.response[i])
        }
    }
    console.log(nbaTeams)
    for(let i = 0; nbaTeams.length; i++) {
        section.style.display = "flex";
        section.style.flexDirection = "row";
        let westernList = document.getElementById('west');
        westernList.style.listStyleType="none";
        let easternList = document.getElementById('east');
        easternList.style.listStyleType="none";
        let team = document.createElement('li');
        team.setAttribute("id", `${i}`)
        team.setAttribute("class", "event")
        let pic = document.createElement('img')
        pic.src=`${nbaTeams[i].logo}`;
        pic.style.height = "100px";
        pic.style.width = "100px";
        team.append(pic);
        if(nbaTeams[i].leagues.standard.conference == "West") {
            westernList.append(team);
        } else {
            easternList.append(team);
        }
        team.addEventListener('click', function(e) {
            if(teamChoices[0] == nbaTeams[team.id]) {
                teamChoices.pop();
            } else {
                teamChoices.push(nbaTeams[team.id]);
            }
            if(teamChoices.length == 2) {
                apiLink = `https://v2.nba.api-sports.io/games?h2h=${teamChoices[0].id}-${teamChoices[1].id}`;
                teamChoices = [];
                showResults();
            }
        })
    }
}

teamList();
