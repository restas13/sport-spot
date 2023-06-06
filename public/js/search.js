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


async function teamList() {
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
        let section = document.getElementById('divideLists');
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
                console.log(teamChoices)
            } else {
                teamChoices.push(nbaTeams[team.id]);
                console.log(teamChoices);
            }
            if(teamChoices.length == 2) {
                apiLink = `https://v2.nba.api-sports.io/games?h2h=${teamChoices[0].id}-${teamChoices[1].id}`;
                console.log(apiLink)
                teamChoices = [];
            }
        })
    }
}

teamList();
